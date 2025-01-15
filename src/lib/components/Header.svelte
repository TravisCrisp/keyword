<script lang="ts">
    import Bars from "../icons/Bars.svelte";
	import { clickOut } from "$lib/utilities/clickOut";
    
    let { app, nav } = $props();
    let isMenuOpen = $state(false);

    function toggleMenu() {
        isMenuOpen = false;
    }

</script>

<header class="bg-blue-100 p-2 flex items-center space-x-4 justify-between relative">
    <div class="flex space-x-2 items-center whitespace-nowrap">
        <a href="/">
            <h1 class="text-2xl font-bold">{app.name}</h1>
        </a>
    </div>
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
</header>