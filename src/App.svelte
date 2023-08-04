<script type="ts">
  import Connect, { marinaStore, MarinaStore } from 'svelte-marina-button';
  import Crafter from './components/Crafter.svelte';

  marinaStore.subscribe((store: MarinaStore) => {
    console.log('store', store);
  });
</script>

<div class="container is-widescreen">
  <Connect cssClass="button is-danger is-outlined is-rounded" />
  <h1 class="title">Craft your custom PSET!</h1>
  <Crafter />
</div>

<style src="./scss/main.scss" lang="scss" global>
</style>
