<script lang="ts">
  import { contractStore } from '../../stores/contract.store';
  import PsetBuilder from './PsetBuilder.svelte';
  import SelectCovenant from './SelectCovenant.svelte';
  import SelectFunction from './SelectFunction.svelte';

  $: shouldSelectCovenantUtxo = $contractStore.contract === undefined;
  $: shouldSelectFunction =
    !shouldSelectCovenantUtxo && $contractStore.tx === undefined;

  $: shouldBuildPset = !shouldSelectCovenantUtxo && !shouldSelectFunction;
</script>

<div>
  {#if shouldSelectCovenantUtxo}
    <SelectCovenant />
  {/if}

  {#if shouldSelectFunction}
    <SelectFunction />
  {/if}

  {#if shouldBuildPset}
    <PsetBuilder />
  {/if}
</div>
