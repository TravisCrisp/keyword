<script>
	import Container from "$lib/components/Container.svelte";
	import Eye from "$lib/icons/Eye.svelte";
	import EyeSlash from "$lib/icons/EyeSlash.svelte";

    let { page } = $props();
    let showPassword = $state(false);

    function togglePasswordVisibility() {
        showPassword = !showPassword;
    }
</script>

{#if page.path === '/sign-in'}
<Container>
        <form method="post" action="?/signin" class="flex flex-col space-y-4">
            <div class="flex flex-col space-y-2">
                <label for="email" class="font-bold">Email</label>
                <input type="text" name="email" class="border border-gray-300 rounded-md p-2" />
            </div>
            <div class="flex flex-col space-y-2">
                <label for="password" class="font-bold">Password</label>
                <input type={showPassword ? "text" : "password"} name="password" class="border border-gray-300 rounded-md p-2" />
            </div>
            <button type="button" onclick={togglePasswordVisibility} class="text-blue-500 max-w-fit">
                {#if showPassword}
                    <EyeSlash />
                {:else}
                    <Eye />
                {/if}
            </button>
            <button type="submit" class="bg-blue-500 text-white rounded-md p-2">Sign in</button>
        </form>
</Container>
{:else if page.path === '/sign-up'}     
    <Container>
        <form method="post" action="?/signup" class="flex flex-col space-y-4">
            <div class="flex flex-col space-y-2">
                <label for="email" class="font-bold">Email</label>
                <input type="text" name="email" class="border border-gray-300 rounded-md p-2" required />
            </div>
            <div class="flex flex-col space-y-2">
                <label for="password" class="font-bold">Password</label>
                <input type={showPassword ? "text" : "password"} name="password" class="border border-gray-300 rounded-md p-2" required/>
            </div>
            <div class="flex flex-col space-y-2">
                <label for="password_confirm" class="font-bold">Confirm Password</label>
                <input type={showPassword ? "text" : "password"} name="password_confirm" class="border border-gray-300 rounded-md p-2" required/>
            </div>
            <button type="button" onclick={togglePasswordVisibility} class="text-blue-500 max-w-fit">
                {#if showPassword}
                    <EyeSlash />
                {:else}
                    <Eye />
                {/if}
            </button>
            <div class="flex items-center space-x-2">   
                <input type="checkbox" name="terms" id="terms" class="border border-gray-300 rounded-md p-2" required />
                <label for="terms">I agree to the <a href="/terms-of-service" class="text-blue-500" target="_blank">terms and conditions</a></label>
            </div>
            <button type="submit" class="bg-blue-500 text-white rounded-md p-2">Sign up</button>
        </form>
    </Container>
{/if}