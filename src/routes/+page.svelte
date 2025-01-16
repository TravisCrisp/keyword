<script>
    
    let { data } = $props();
    let { page } = $derived(data);

</script>

<svelte:head>
    <title>{page.name}</title>
    <meta name="description" content={""}/>
    <meta name="robots" content={"no-index, no-follow"} />
    <script type="application/ld+json">
        {@html JSON.stringify("")}
    </script>
</svelte:head>

<h2 class="text-center text-xl font-bold">{page.name}</h2>
