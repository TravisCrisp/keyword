<script>
	import Container from "$lib/components/Container.svelte";

</script>
<Container>
    <form method="post" action="/signin">
        <input type="text" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Sign in</button>
    </form>
</Container>