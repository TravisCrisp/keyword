<script lang="ts">
    let { page } = $props();
</script>

<div class="flex flex-col space-y-4">
    {#each page.content as content}
        <div class="flex flex-col space-y-4">
            <h3 class="text-lg font-bold">{content.name}</h3>
        </div>
    {/each}
</div>