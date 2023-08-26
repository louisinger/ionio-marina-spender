<script type="ts">
  import Main from './components/Main.svelte';
  import { marinaStore } from './stores/marina.store';
  import Navbar from './components/Navbar.svelte';

  let isEnabled = false;

  marinaStore.subscribe((v) => {
    isEnabled = v.enabled;
  });
</script>

<Navbar />
<Main />

<style src="./scss/main.scss" lang="scss" global>
</style>
