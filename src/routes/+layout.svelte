<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Main from '$lib/components/Main.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import '../app.css';
	let { data, children } = $props();
	let { project, nav } = $state(data);
	
</script>

<Header {project} nav={nav.header}/>
<Main>
	{@render children()}
</Main>
<Footer nav={nav.footer}/>