<script lang="ts">
	import Container from "$lib/components/Container.svelte";

    let { data } = $props();
    let application = $state(data.applications[0]);

    function selectApp(id: number) {
        application= data.applications.find((app: any) => app.id === id);
    }

</script>
<div class="flex flex-col items-center justify-center space-y-4 w-full">
    <Container>
        <div class="flex items-center space-x-4">
            <h2 class="text-xl font-bold">Application</h2>
            <select onchange={(e) => selectApp(Number(e.currentTarget.value))} class="border border-gray-300 rounded-md p-2 min-w-48">
                {#each data.applications as app}
                    <option value={app.id}>{app.name}</option>
                {/each}
            </select>
        </div>
    </Container>
    <p>{application?.id}</p>
</div>