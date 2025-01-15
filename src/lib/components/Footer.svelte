<script>
    let { app, nav } = $props();

</script>

<footer class="inset-x-0 bottom-0 bg-blue-100 flex justify-center p-4">
    <div class="space-y-4 p-4">
        <nav class="space-y-4 space-x-4 md:space-y-0 md:flex md:justify-between">
            {#each nav.pages as page}
                <div class="flex justify-center space-x-4">
                    <a href={page.path} class="p-2 rounded-md">
                        <span class="underline">{page.name}</span>
                    </a>
                </div>
            {/each}
        </nav>
        <hr class='h-px my-8 bg-black border-0'>
        <p class="flex justify-center">© {app.name}</p>
    </div>
</footer>