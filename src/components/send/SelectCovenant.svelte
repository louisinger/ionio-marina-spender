<script type="ts">
  import { covenantStore } from '../../stores/covenants.store';
  import CovenantsList from './CovenantsList.svelte';

  $: title =
    $covenantStore.length > 0
      ? 'Select a covenant UTXO'
      : 'No covenant outputs found';
</script>

<div>
  <h4 class="title has-text-centered">{title}</h4>
  {#if $covenantStore.length > 0}
    <CovenantsList />
  {/if}
</div>
