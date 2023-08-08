<script type="ts">
  import Main from './components/Main.svelte';
  import { initProvider, marinaStore } from './stores/marina.store';

  let showCrafter = false;
  let showConnect = false;

  marinaStore.subscribe(({ enabled, provider }) => {
    if (!provider || !enabled) initProvider().then((v) => marinaStore.set(v));

    showCrafter = enabled && !!provider;
    showConnect = !enabled && !!provider;
  });
</script>

<section class="section">
  {#if showConnect}
    <div class="notification is-warning">
      <button
        class="button"
        on:click={() =>
          $marinaStore.provider
            .enable()
            .then(() => initProvider().then((v) => marinaStore.set(v)))}
        >Enable</button
      >
      <strong>Warning</strong> Marina is not enabled. Please connect your wallet.
    </div>
  {/if}

  {#if showCrafter}
    <Main />
  {/if}

  {#if !showCrafter && !showConnect}
    <div class="notification is-warning">
      <strong>Warning</strong> Marina is not installed.
    </div>
  {/if}
</section>

<style src="./scss/main.scss" lang="scss" global>
</style>
