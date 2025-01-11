<script>
    import { getSchema } from "$lib/schema/getSchema";

    let { data } = $props();
    let { page, meta } = $state(data);
    const schema = getSchema(meta.schema);

</script>

<svelte:head>
    <title>{meta.title}</title>
    <meta name="description" content={meta.description}/>
    <meta name="robots" content={meta.robots} />
    <script type="application/ld+json">
        {@html JSON.stringify(schema)}
    </script>
</svelte:head>

<h2 class="text-xl font-bold">{page.h2}</h2>
<p>{page.p}</p>