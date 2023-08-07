<script lang="ts">
  import { contractStore } from '../stores/contract.store';
  import AddInputModal from './AddInputModal.svelte';
  import SelectCovenant from './SelectCovenant.svelte';
  import SelectFunction from './SelectFunction.svelte';

  let addInputOpen = false;

  const buttons = [
    {
      name: 'addInput',
      handler: () => {
        addInputOpen = true;
      },
    },
    { name: 'addOutput', handler: () => {} },
    { name: 'addCovenant', handler: () => {} },
    { name: 'addBlinding', handler: () => {} },
  ];

  $: shouldSelectCovenantUtxo = $contractStore.contract === undefined;
  $: shouldSelectFunction =
    !shouldSelectCovenantUtxo && $contractStore.tx === undefined;
</script>

<div class="container">
  <AddInputModal open={addInputOpen} />

  {#if shouldSelectCovenantUtxo}
    <SelectCovenant />
  {/if}

  {#if shouldSelectFunction}
    <SelectFunction />
  {/if}

  <!-- <div class="container">
    <div class="columns">
        {#each buttons as button}
            <div class="column">
            <button class="button is-primary" on:click={button.handler}>{button.name}</button>
            </div>
        {/each}
    </div>
  </div>

  <div class="container columns">
    <div class="column">
      {#each $contractStore.inputs as input}
        <Input utxo={input} />
      {/each}
    </div>

    <div class="column">
      {#each $contractStore.outputs as output}
        <Output {output} />
      {/each}
    </div>
  </div> -->
</div>
