<script lang="ts">
  import { contractStore } from '../stores/contract.store';
  import { covenantStore } from '../stores/covenants.store';
  import AddInputModal from './AddInputModal.svelte';
  import CovenantsList from './CovenantsList.svelte';
  import Input from './Input.svelte';
  import Output from './Output.svelte';

  let addInputOpen = false;

  const buttons = [
    { name: 'addInput', handler: () => { addInputOpen = true } },
    { name: 'addOutput', handler: () => {} },
    { name: 'addCovenant', handler: () => {} },
    { name: 'addBlinding', handler: () => {} },
  ]
</script>

<section>
  <AddInputModal open={addInputOpen} />

  <div class="container">
    <div class="box">
      {#if $covenantStore.length > 0}
        <h2 class="title">Select a covenant output to spend</h2>
        <CovenantsList />
      {:else}
        <h2 class="title">No ionio utxos found in your wallet</h2>
      {/if}
    </div>
  </div>

  <div class="container">
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
  </div>
</section>
