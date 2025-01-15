<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Main from '$lib/components/Main.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import '../app.css';
	let { data, children } = $props();
	let { app, nav } = $state(data);
</script>

<Header {app} nav={nav.find((nav: { name: string }) => nav.name === "Header")}/>
<Main>
	{@render children()}
</Main>
<Footer {app} nav={nav.find((nav: { name: string }) => nav.name === "Footer")}/>