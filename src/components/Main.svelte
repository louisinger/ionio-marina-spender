<script lang="ts">
  import { Page, navigationStore } from '../stores/navigation.store';
  import Home from './Home.svelte';
  import Send from './send/Send.svelte';
</script>

<div class="container is-fluid mb-4">
  {#if $navigationStore === Page.Home}
    <Home />
  {:else}
    <Send />
  {/if}
</div>
