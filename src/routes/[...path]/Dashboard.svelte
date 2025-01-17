<script lang="ts">
	import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from "$env/static/public";
	import Container from "$lib/components/Container.svelte";
	import { createClient } from "@supabase/supabase-js";
	import { onMount } from "svelte";

    let { data } = $props();
    let application = $state({});
    let pages = $state([]);
    const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

    async function getPages(id: number) {
        const { data: pageData, error: pageError  } = await supabase.from('page').select('*').eq('app_id', id);
        console.log(pageData);
        return pageData;
    };

    async function selectApp(id: number) {
        application= data.applications.find((app: any) => app.id === id);
        pages = await getPages(id);
    };

    onMount(() => {
        selectApp(data.applications[0].id);
    })

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
    <Container>
        <h2 class="text-xl font-bold">Pages</h2>
        <ul>
            {#each pages || [] as page}
                <li>{page.name}</li>
            {/each}
        </ul>
    </Container>
</div>