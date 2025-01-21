<script lang="ts">
    let { page, pageMetaEdit } = $props();

</script>

{#if pageMetaEdit}
<form method="post" action="?/updatePage" class="flex flex-col space-y-4">
    <div class="flex flex-col space-y-4">
        <div class="flex flex-col space-y-2">
            <label for="title">Title </label>
            <input type="text" name="title" placeholder="Title" value={page.title} class="w-full border border-gray-300 rounded-md p-2" />
        </div>
        <div class="flex flex-col space-y-2">
            <label for="description">Description</label>
                <input type="text" name="description" placeholder="Description" value={page.description} class="w-full border border-gray-300 rounded-md p-2" />
            </div>
        </div>
    </form>
{:else}
<div class="flex flex-col space-y-4">
    <div class="flex flex-col space-y-4">
        <div class="flex flex-col space-y-2">
            <label class="text-sm font-medium text-gray-500" for="title">Title </label>
            <span class="w-full rounded-md p-2">{page.title}</span>
        </div>
        <div class="flex flex-col space-y-2">
            <label class="text-sm font-medium text-gray-500" for="description">Description</label>
            <span class="w-full rounded-md p-2">{page.description}</span>
        </div>
    </div>
</div>
{/if}
