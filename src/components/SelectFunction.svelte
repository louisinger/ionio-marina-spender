<script type="ts">
  import type { ArtifactFunction } from '@ionio-lang/ionio';
  import { contractStore } from '../stores/contract.store';
  import type { IonioUtxo } from '../stores/covenants.store';
  import IonioFunctionInput from './common/IonioFunctionInput.svelte';
  import UtxoCovenantBox from './common/UtxoCovenantBox.svelte';

  let selected = '';
  let ionioFunction: ArtifactFunction | undefined = undefined;

  $: hasContract = $contractStore.contract !== undefined;
  $: covenant = hasContract
    ? ($contractStore.inputs[0] as IonioUtxo)
    : undefined;
  $: title = hasContract
    ? 'Select the covenant branch'
    : 'No contract selected';
</script>

<div>
  <h4 class="title has-text-centered">{title}</h4>
  {#if covenant}
    <UtxoCovenantBox {covenant} />
  {/if}

  <div class="is-flex is-align-content-center mb-3">
    <div class="control has-icons-left">
      <div class="select is-large">
        <select
          bind:value={selected}
          on:change={() =>
            (ionioFunction = covenant.scriptDetails.artifact.functions.find(
              (fn) => fn.name === selected
            ))}
        >
          {#each covenant.scriptDetails.artifact.functions.map((fn) => fn.name) as branch}
            <option value={branch}>
              {branch}
            </option>
          {/each}
        </select>
      </div>
      <span class="icon is-large is-left">
        <i class="fas fa-code-branch" />
      </span>
    </div>

    {#if ionioFunction && ionioFunction.require.length > 0}
      <div class="notification ml-2">
        <span class="icon">
          <i class="fas fa-exclamation-triangle" />
        </span>
        <span> This branch has introspection requirements. </span>
      </div>
    {/if}
  </div>

  {#if ionioFunction !== undefined}
    <hr class="mt-2 mb-2" />

    <h5 class="title has-text-centered">
      "{selected}" has {ionioFunction.functionInputs.length} parameters
    </h5>

    {#each ionioFunction.functionInputs as parameter, index}
      <IonioFunctionInput {parameter} onChange={console.log} />
    {/each}
  {/if}
</div>
