<script lang="ts">
	import Container from "$lib/components/Container.svelte";

    let { data, supabase, selectedApplication } = $props();
    let application = $state(selectedApplication);
    
    async function selectApp(id: number) {
        const { data, error } = await supabase.rpc('get_application', { application_id: id });
        if (error) {
            console.error(error);
        }
        application = data;
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
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {#each application.pages as page}
                <Container> 
                    <li>{page.name}</li>
                </Container>
            {/each}
        </div>
    </div>
    <div class="space-y-4">
        <h2 class="text-xl font-bold">Navigation</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {#each application.nav as nav}
                <Container>
                    <div class="flex items-center space-x-4">
                        <li>{nav.name}</li>
                        <button class="bg-blue-500 text-white px-2 py-1 rounded-md">Edit</button>
                    </div>
                </Container>
            {/each}
        </div>
    </div>
</div>
