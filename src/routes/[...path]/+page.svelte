<script>
	import Dashboard from './Dashboard.svelte';
	import Auth from './Auth.svelte';


    let { data } = $props();
    let { page } = $derived(data);

</script>

<svelte:head>
    <title>{page.name}</title>
    <meta name="description" content={""}/>
    <meta name="robots" content={"noindex, nofollow"} />
    <script type="application/ld+json">
        {@html JSON.stringify(meta.schema)}
    </script>
</svelte:head>

<h2 class="text-center text-xl font-bold p-4">{page.name}</h2>
{#if page.path === '/dashboard'}
    <Dashboard />
{:else if page.path === '/sign-in' || page.path === '/sign-up'}
    <Auth page={page} />
{/if}
