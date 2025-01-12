<script>
    
    let { data } = $props();
    let { meta, page } = $state(data);

</script>

<svelte:head>
    <title>{meta.title}</title>
    <meta name="description" content={meta.description}/>
    <meta name="robots" content={meta.robots} />
    <script type="application/ld+json">
        {@html JSON.stringify(meta.schema)}
    </script>
</svelte:head>

<h2 class="text-xl font-bold">{page.h2}</h2>
<p>{page.p}</p>