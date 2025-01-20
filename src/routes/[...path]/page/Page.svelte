<script lang="ts">
    import Container from '$lib/components/Container.svelte';
	import Close from '$lib/icons/Close.svelte';
	import Down from '$lib/icons/Down.svelte';
	import Plus from '$lib/icons/Plus.svelte';
	import Right from '$lib/icons/Right.svelte';
	import Trash from '$lib/icons/Trash.svelte';
	import CreatePage from './CreatePage.svelte';
	import PageContent from './PageContent.svelte';

    let { application, page, supabase, togglePageActive } = $props();

    let pageOpen = $state(false);
    let createChildPage = $state(false);

    async function toggleCurrentPageActive(active: boolean) {
        const { data, error } = await supabase.from('page').update({ active: !active }).eq('id', page.id).eq('app_id', application.id);
        if (error) {
            console.error(error);
        };

        page.active = !active;

        if (page.active) {
            const segments = page.path.split('/');
            const parentPaths = [];

            for (let i = segments.length - 1; i > 1; i--) {
                const parentPath = segments.slice(0, i).join('/');
                parentPaths.push(parentPath);
            }

            const { data: pagesData, error: pagesError } = await supabase.from('page').update({ active: true }).or(parentPaths.map((path) => `path.eq.${path}`).join(','))
            .eq('app_id', application.id).select('*');
            if (pagesError) {
                console.error(pagesError);
            };

            for (const page of pagesData) {
                togglePageActive(page.path, !active)
            };

        } else {
            const { data: pages, error: pagesError } = await supabase.from('page').update({ active: !active }).eq('app_id', application.id).like('path', `${page.path}%`).select('*');
            if (pagesError) {
                console.error(pagesError);
            };

            for (const page of pages) {
                togglePageActive(page.path, !active)
            };
        };
    };
    
    function togglePageOpen() {
        pageOpen = !pageOpen;
    };

    function toggleCreateChildPage() {
        createChildPage = !createChildPage;
    };

    function confirmDelete(event: Event) {
        if (!confirm('Are you sure you want to delete this page? All descendants will also be deleted.')) {
            event.preventDefault()
        }
    }

</script>

<Container>
<div class="flex flex-col space-y-4">
    <div class="flex items-center justify-between space-x-4">
        <div class="flex items-center space-x-2">
        {#if pageOpen}
            <button onclick={togglePageOpen}>
                <Down />
            </button>
        {:else}
            <button onclick={togglePageOpen}>
                <Right />
            </button>
        {/if}
            <div class="flex flex-col">
                <h3 class="text-lg font-bold">{page.name}</h3>
                <p class="text-sm text-gray-500">{page.path}</p>
            </div>
        </div>
    {#if page.path !== '/'}
        <div class="flex items-center space-x-2">
        {#if !createChildPage}
            <button onclick={toggleCreateChildPage}>
                <Plus />
            </button>
        {:else}
            <button onclick={toggleCreateChildPage}>
                <Close />
            </button>
        {/if}
            <form method="post" action="?/deletePage" onsubmit={confirmDelete}>
                <input type="hidden" name="path" value={page.path} />
                <input type="hidden" name="app_id" value={application.id} />
                <button>
                    <Trash />
                </button>
            </form>
            <div class="flex items-center gap-2.5">
                <label class="cursor-pointer">
                    <input
                        type="checkbox"
                        checked={page.active}
                        onchange={() => toggleCurrentPageActive(page.active)}
                        class="hidden"
                    />
                    <div
                        class={`w-12 h-7 rounded-full bg-${page.active ? 'green-500' : 'red-500'} relative transition-colors duration-300 ease-in-out`}
                    >
                        <div
                            class={`w-5 h-5 bg-white rounded-full absolute top-[4px] transform transition-transform duration-300 ease-in-out ${
                                page.active ? 'translate-x-6' : 'translate-x-1'
                            }`}></div>
                    </div>
                </label>
            </div>
        </div>
    {/if}
    </div>
    {#if pageOpen}
        <PageContent page={page} />
    {/if}
    {#if createChildPage}
        <div class="flex flex-col space-y-4">
            <CreatePage application={application} createPage={toggleCreateChildPage} parentPage={page}/>
        </div>
    {/if}
</div>
</Container>