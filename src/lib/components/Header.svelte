<script lang="ts">
    import Bars from "../icons/Bars.svelte";
	import { clickOut } from "$lib/utilities/clickOut";
	import User from "$lib/icons/User.svelte";

    let { app, nav, userNav, session } = $props();
    let isMenuOpen = $state(false);
    let isUserMenuOpen = $state(false);
    
    function toggleMenu() {
        isMenuOpen = false;
    }

    function toggleUserMenu() {
        isUserMenuOpen = false;
    }

</script>

<header class="bg-blue-100 p-2 flex items-center space-x-4 justify-between relative">
    <div class="flex space-x-2 items-center whitespace-nowrap">
        <a href="/">
            <h1 class="text-2xl font-bold">{app.name}</h1>
        </a>
    </div>
    <div class="flex items-center space-x-2">
        <div use:clickOut onclick_out={toggleMenu} class="flex items-center">
            {#if !isMenuOpen}
    
            <button onclick={isMenuOpen = true}>
                <Bars />
            </button>
            {:else}
            <button onclick={isMenuOpen = false}>
                <Bars />
            </button>
                <nav class="justify-right absolute top-full right-0 mt-0 bg-blue-100 z-50">
                    {#each nav.pages as page}
                        <div class="flex justify-center block text-l font-bold hover:bg-blue-200">
                            <a
                                href={page.path}
                                class="p-2"
                                onclick={() => isMenuOpen = false}
                            >
                                {page.name}
                            </a>
                        </div>
                    {/each}
                </nav>
            {/if}
        </div>
        <div use:clickOut onclick_out={toggleUserMenu} class="flex items-center">
            {#if !isUserMenuOpen}
            <button onclick={isUserMenuOpen = true}>
                <User />
            </button>
            {:else}
            <button onclick={isUserMenuOpen = false}>
                <User />
            </button>
            <nav class="justify-right absolute top-full right-0 mt-0 bg-blue-100 z-50">
                {#if !session}
                <div class="flex justify-center block text-l font-bold hover:bg-blue-200">
                    <a href="/sign-in" class="p-2">Sign in</a>
                </div>
                <div class="flex justify-center block text-l font-bold hover:bg-blue-200">
                    <a href="/sign-up" class="p-2">Sign up</a>
                </div>
                {:else}
                <div class="flex justify-center block text-l font-bold hover:bg-blue-200">
                    <a href="/sign-out" class="p-2">Sign out</a>
                </div>
                {/if}
            </nav>
            {/if}
        </div>
    </div>
</header>