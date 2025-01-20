<script lang="ts">
	import Container from "$lib/components/Container.svelte";
	import Close from "$lib/icons/Close.svelte";

    let { application, createPage, parentPage } = $props();
    let nameValue = $state("");
    let slug = $state("");
    let selectedParentPage = $state(application.page[0]);

    function selectParentPage(id: number) {
        selectedParentPage = application.page.find(page => page.id == id);
    };

    function onNameChange(name: string) {
        setSlug(name);
    };

    function setSlug(name: string) {
        slug = name.trim().toLowerCase().replace(/ /g, '-');
    };

    function setName(name: string) {
        const exceptions = ['a', 'or', 'and', 'is', 'the', 'of', 'in', 'on', 'at', 'to', 'for'];
        nameValue = name
            .replace(/[^a-zA-Z0-9\s]/g, '')
            .split(' ')
            .map((word, index) => {
                const lowerCaseWord = word.toLowerCase();
                if (index === 0 || !exceptions.includes(lowerCaseWord)) {
                    return word.charAt(0).toUpperCase() + word.slice(1);
                }
                return word.toLowerCase();
            })
            .join(' ')
    };

    if (parentPage) {
        selectedParentPage = parentPage;
    };

</script>

    <div class="flex flex-col space-y-4">
        <div class="flex items-top space-x-4 justify-between">
            <h3 class="font-bold">Create {parentPage ? `Child Page` : `Page`}</h3>
        {#if !parentPage}
            <button class="bg-blue-500 text-white px-2 py-1 rounded-md" onclick={() => createPage()}>
                <Close />
            </button>
        {/if}
    </div>
    <form method="POST" action="?/createPage" class="flex flex-col space-y-4">
        <div class="flex flex-col space-y-1">
            <label for="name">Name</label>
            <input required onchange={(e) => onNameChange(e.currentTarget.value)} oninput={(e) => setName(e.currentTarget.value)} type="text" name="name" class="w-full border border-gray-300 rounded-md p-2" value={nameValue} />
        </div>
        {#if !parentPage}
        <div class="flex flex-col space-y-1">
            <label for="parent_id">Parent</label>
            <select name="parent_id" class="w-full border border-gray-300 rounded-md p-2"
            onchange={(e) => selectParentPage(Number(e.currentTarget.value))}>
                {#each application.page as page}
                    <option value={page.id}>{page.name}</option>
                {/each}
                </select>
            </div>
        {/if}
        <div class="flex flex-col space-y-1">
            <label for="path">Path</label>
            <div class="flex items-center space-x-2 w-full">
                <span class="w-full">{selectedParentPage.path === "/" ? "/" + slug : selectedParentPage.path + "/" + slug}</span>
            </div>
        </div>
            <input type="hidden" name="path" value={selectedParentPage.path === "/" ? "/" + slug : selectedParentPage.path + "/" + slug}/>
            <input type="hidden" name="parent_id" value={selectedParentPage.path === "/" ? null : selectedParentPage.id} />
            <input hidden type="text" name="app_id" value={application.id} />
            <input hidden type="text" name="layout_id" value="1" />
            <button type="submit" class="bg-blue-500 text-white px-2 py-1 rounded-md">Create</button>
        </form>
    </div>
