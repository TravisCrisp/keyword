<script lang="ts">
    let { page } = $props();
</script>

<div class="flex flex-col space-y-4">
    {#each page.content as content}
        <div class="flex flex-col space-y-4">
            {#if content.tag == 'h2'}
                <h2 class="text-lg font-bold">{content.content}</h2>
            {:else if content.tag == 'h3'}
                <h3 class="text-lg font-bold">{content.content}</h3>
            {:else if content.tag == 'p'}
                <p class="text-sm">{content.content}</p>
            {:else if content.tag == 'a'}
                <a class="text-sm" href={content.content}>{content.content}</a>
            {:else if content.tag == 'img'}
                <img class="w-full" src={content.content} alt={content.content} />
            {:else if content.tag == 'ul'}
                <ul class="list-disc list-inside">{content.content}</ul>
            {:else if content.tag == 'ol'}
                <ol class="list-decimal list-inside">{content.content}</ol>
            {/if}   
        </div>
    {/each}
</div>