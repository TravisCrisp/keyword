<script lang="ts">
    import Container from '$lib/components/Container.svelte';

    let { data, supabase, nav } = $props();

</script>

<Container>
    <div class="flex items-center space-x-4">
        <li>{nav.name}</li>
    </div>
</Container>