<script lang="ts">
  import { Page, navigationStore } from "../stores/navigation.store";
  import Home from "./Home.svelte";
  import Send from "./send/Send.svelte";

</script>

<div class="container">
    {#if $navigationStore === Page.Send}
        <Send />
    {:else if $navigationStore === Page.Receive}
        <!-- <Receive /> -->
    {:else}
        <Home />
    {/if}
</div>