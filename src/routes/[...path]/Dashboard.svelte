<script lang="ts">
	import Container from "$lib/components/Container.svelte";
    import { sortPagesByPath } from '$lib/utilities/sort';
    let { data, supabase, selectedApplication } = $props();
    let application = $state(selectedApplication);
    
    async function selectApp(id: number) {
        const { data, error } = await supabase.rpc('get_application', { application_id: id });
        if (error) {
            console.error(error);
        }
        application = data;
        application.pages = sortPagesByPath(application.pages);
    };

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
        <h2 class="text-xl font-bold">Pages</h2>
        <div class="flex flex-col space-y-4">
            {#each application.pages as page}
                <Container>
                    <div class="flex items-center space-x-4">   
                        <p>{page.name}</p>
                        <p>{page.path}</p>
                    </div>
                </Container>
            {/each}
        </div>
    </div>
    <div class="space-y-4">
        <h2 class="text-xl font-bold">Navigation</h2>
        <div class="flex flex-col space-y-4">
            {#each application.nav as nav}
                <Container>
                    <div class="flex items-center space-x-4">
                        <li>{nav.name}</li>
                    </div>
                </Container>
            {/each}
        </div>
    </div>
</div>
