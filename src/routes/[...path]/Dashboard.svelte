<script lang="ts">
	import Container from "$lib/components/Container.svelte";

    let { data } = $props();

    data.myApps = [
        { id: "1", name: "App 1", pages: [  
            { id: "1", name: "Home" },
            { id: "2", name: "About" },
            { id: "3", name: "Contact" }
        ],
        nav: [
            { id: "1", name: "Header" },
            { id: "2", name: "Footer" },
            { id: "3", name: "Sidebar" }
        ]
     },
        { id: "2", name: "App 2", pages: [
            { id: "1", name: "About" },
            { id: "2", name: "Products" },
            { id: "3", name: "Services" }
        ],
        nav: [
            { id: "1", name: "Header" },
            { id: "2", name: "Footer" },
            { id: "3", name: "Sidebar" }
        ]
     },
    ];

    let application = $state(data.myApps[0]);

    function selectApp(app: string) {
        console.log(app);
        application= app;
    }

</script>
<div class="flex flex-col items-center justify-center space-y-4 w-full">
    <Container>
        <div class="flex items-center space-x-4">
            <h2 class="text-xl font-bold">Application</h2>
            <select onchange={(e) => selectApp(data.myApps.find(app => app.id === e.currentTarget.value))} class="border border-gray-300 rounded-md p-2 min-w-48">
            {#each data.myApps as app}
                <option value={app.id}>{app.name}</option>
            {/each}
            </select>
        </div>
    </Container>
    <div class="flex flex-col items-center justify-center space-y-4 w-full">
        <h2 class="text-xl font-bold">Pages</h2>
        <div class="grid grid-cols-2 gap-4">
            {#each application.pages as page}
            <Container>
                <div class="flex flex-col items-center justify-center">
                    <h3 class="font-semibold">{page.name}</h3>
                    <!-- Add more content related to the page here if needed -->
                </div>
            </Container>
            {/each}
        </div>
    </div>
    <div class="flex flex-col items-center justify-center space-y-4 w-full">
        <h2 class="text-xl font-bold">Navigation</h2>
        <div class="grid grid-cols-2 gap-4">
            {#each application.nav as nav}
            <Container>
                <div class="flex flex-col items-center justify-center">
                    <h3 class="font-semibold">{nav.name}</h3>
                    <!-- Add more content related to the page here if needed -->
                </div>
            </Container>
            {/each}
        </div>
    </div>
</div>