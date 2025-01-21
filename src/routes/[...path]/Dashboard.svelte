<script lang="ts">
	import Plus from "$lib/icons/Plus.svelte";
    import { sortPagesByPath } from '$lib/utilities/sort';
	import Page from "./page/Page.svelte";
	import Navigation from "./nav/Navigation.svelte";
	import CreatePage from "./page/CreatePage.svelte";
	import Container from "$lib/components/Container.svelte";
    let { data, supabase, selectedApplication } = $props();
    let application = $state(selectedApplication);
    let createPage = $state(false);

    function toggleCreatePage() {
        createPage = !createPage;
    }

    async function selectApp(id: number) {
        const { data: selectedApp, error: selectedApplicationError } = await supabase
            .from('app')
            .select('*, theme: theme(*), template(*), page(*, layout(*),parents: page_hierarchy!page_hierarchy_child_id_fkey(*), children: page_hierarchy!page_hierarchy_parent_id_fkey(*), nav_page(*), page_schema(*), content(*)), nav(*, nav_page(*))')
            .eq('id', id)
            .single();
            selectedApp.page = sortPagesByPath(selectedApp.page);
            selectedApplication = selectedApp
    };

    function togglePageActive(path: string, active: boolean) {
        const page = application.page.find(p => p.path === path);
        page.active = active;
    }

</script>
<div class="items-center justify-center space-y-4 w-full">
    <div class="flex items-center space-x-4">
        <h2 class="text-xl font-bold">Application</h2>
        <select 
            onchange={(e) => selectApp(Number(e.currentTarget.value))} 
            class="border border-gray-300 rounded-md p-2 min-w-48"
        >
            {#each data.applications as app}
                <option value={app.id}>{app.name}</option>
            {/each}
        </select>
    </div>
    <div class="space-y-4">
        <div class="flex items-center space-x-4">
            <h2 class="text-xl font-bold">Pages</h2>
            {#if !createPage}
            <button class="bg-blue-500 text-white px-2 py-1 rounded-md" onclick={toggleCreatePage}>
                <Plus />
            </button>
            {/if}
        </div>
        {#if createPage}
        <Container>
            <CreatePage application={application} createPage={toggleCreatePage} parentPage={null}/>
        </Container>
        {/if}
        <div class="flex flex-col space-y-4">
            {#each application.page as page}
                <Page {page} {application} {supabase} {togglePageActive} />
            {/each}
        </div>
    </div>
    <div class="space-y-4">
        <h2 class="text-xl font-bold">Navigation</h2>
        <div class="flex flex-col space-y-4">
            {#each application.nav as nav}
                <Navigation nav={nav} />
            {/each}
        </div>
    </div>
</div>
