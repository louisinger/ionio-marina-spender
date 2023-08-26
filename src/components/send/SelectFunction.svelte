<script type="ts">
  import {
    Argument,
    ArtifactFunction,
    PrimitiveType,
    Signer,
  } from '@ionio-lang/ionio';
  import { apply, contractStore } from '../../stores/contract.store';
  import type { IonioUtxo } from '../../stores/covenants.store';
  import IonioFunctionInput from '../common/IonioFunctionInput.svelte';
  import UtxoCovenantBox from '../common/UtxoCovenantBox.svelte';
  import { marinaStore } from '../../stores/marina.store';

  let selected = '';
  let ionioFunction: ArtifactFunction | undefined = undefined;
  let functionParameters: (Argument | undefined)[] = [];

  const onSelect = () => {
    ionioFunction = covenant.scriptDetails.artifact.functions.find(
      (fn) => fn.name === selected
    );

    functionParameters = Array(ionioFunction.functionInputs.length).fill(
      undefined
    );

    const marinaSigner: Signer = {
      signTransaction(psetBase64) {
        return $marinaStore.provider.signTransaction(psetBase64);
      },
    };

    for (const [index, param] of ionioFunction.functionInputs.entries()) {
      if (param.type === PrimitiveType.Signature) {
        functionParameters[index] = marinaSigner;
      }
    }
  };

  const onParameterChange = (paramIndex: number) => (value: Argument) => {
    if (!ionioFunction) return;
    const param = ionioFunction.functionInputs[paramIndex];
    if (!param) return;
    functionParameters[paramIndex] = value;
  };

  const onConfirm = () => {
    if (!selected) return;
    contractStore.update(apply(selected, ...functionParameters));
  };

  $: hasContract = $contractStore.contract !== undefined;
  $: covenant = hasContract
    ? ($contractStore.inputs[0] as IonioUtxo)
    : undefined;
  $: title = hasContract
    ? 'Select the covenant branch'
    : 'No contract selected';
  $: contractName = hasContract
    ? covenant.scriptDetails.artifact.contractName
    : '';
  $: numberOfBranches = hasContract
    ? covenant.scriptDetails.artifact.functions.length
    : 0;

  $: textIntro = hasContract
    ? `You've selected ${contractName} covenant, it has ${numberOfBranches} branch${
      numberOfBranches > 1 ? 'es' : ''
    }.`
    : '';

  $: textSelect = hasContract
    ? 'Select the branch to use and fill parameters.'
    : '';

  $: submitButtonDisabled = functionParameters.some(
    (param) => param === undefined
  );
</script>

<div>
  <h4 class="title has-text-centered">{title}</h4>
  {#if covenant}
    <p class="is-size-6 is-italic">{textIntro}</p>
    <UtxoCovenantBox {covenant} />
  {/if}

  <p class="is-size-6 is-italic mt-3">{textSelect}</p>
  <div class="is-flex is-align-content-center mt-1 mb-3">
    <div class="control has-icons-left">
      <div class="select is-large">
        <select bind:value={selected} on:change={onSelect}>
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
      <IonioFunctionInput {parameter} onChange={onParameterChange(index)} />
    {/each}

    <button
      class="button is-primary is-fullwidth mt-2"
      disabled={submitButtonDisabled}
      on:click={onConfirm}
    >
      CONFIRM
    </button>
  {/if}
</div>
