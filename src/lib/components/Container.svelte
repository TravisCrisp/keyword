<script lang="ts">
    let { children } = $props();
    
</script>

<div class="bg-blue-100 rounded-md p-4 shadow-lg">
    {@render children()}
</div>