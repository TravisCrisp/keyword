<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Main from '$lib/components/Main.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import '../app.css';
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';
	let { data, children } = $props();
	let { app } = $derived(data);
	let { session, supabase } = $derived(data)
	let { nav } = $derived(app)

	onMount(() => {
	const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
		if (newSession?.expires_at !== session?.expires_at) {
		invalidate('supabase:auth')
		}
	})

	return () => data.subscription.unsubscribe()
	})
</script>

<Header {app} nav={nav.header} userNav={nav.user} {session}/>
<Main>
	{@render children()}
</Main>
<Footer {app} nav={nav.footer}/>