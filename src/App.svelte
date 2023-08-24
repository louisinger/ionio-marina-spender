<script type="ts">
  import { onMount } from 'svelte';
  import Main from './components/Main.svelte';
  import { initProvider, marinaStore } from './stores/marina.store';

  marinaStore.subscribe((v) => {
    console.log(v);
  });

  const init = async () => {
    console.log('init')
    const v = await initProvider();
    marinaStore.set(v);
    if ($marinaStore.provider) {
      if ($marinaStore.enabled) return true;
      await $marinaStore.provider.enable();
      const v = await initProvider();
      marinaStore.set(v);
      return $marinaStore.provider.isEnabled()
    }
    return false;
  };

</script>

<section class="section">
  {#await init()}
    <div class="notification is-info">
      <span class="icon"><i class="fas fa-info-circle"></i></span>
      <strong>Marina</strong> is initializing...
    </div>
  {:then isEnabled}
    {#if isEnabled}
      <Main />
    {/if}
  {:catch error}
    <div class="notification is-danger">
      <span class="icon"><i class="fas fa-exclamation-triangle"></i></span>
      <strong>Marina</strong> failed to initialize.
      <br />
      <code>{error.message}</code>
    </div>
  {/await}
</section>

<style src="./scss/main.scss" lang="scss" global>
</style>
