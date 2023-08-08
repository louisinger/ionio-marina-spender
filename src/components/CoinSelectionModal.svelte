<script type="ts">
  import { selectCoins } from '../application/selection';
  import {
    addInput,
    addRecipientOutput,
    contractStore,
  } from '../stores/contract.store';
  import { assetsStore } from '../stores/assets.store';
  import BaseModal from './common/BaseModal.svelte';
  import LiquidValue from './common/LiquidValue.svelte';
  import { utxosStore } from '../stores/utxos.store';
  import { marinaStore } from '../stores/marina.store';
  import { AssetHash } from 'liquidjs-lib';

  export let onClose: () => void;

  const selectedOutputs: Array<boolean> = Array(
    $contractStore.outputs.length
  ).fill(false);

  $: availableUtxos = $utxosStore.filter((utxo) => {
    if (
      $contractStore.inputs.find(
        (i) => i.txid === utxo.txid && i.vout === utxo.vout
      )
    )
      return false;
    return true;
  });

  $: targets = selectedOutputs.reduce((acc, res, index) => {
    if (!res) return acc;
    const output = $contractStore.outputs[index];
    const asset = output.asset;
    if (acc[asset]) {
      acc[asset] += output.value;
    } else {
      acc[asset] = output.value;
    }
    return acc;
  }, {});

  $: coinSelectionResults = Object.entries(targets || {}).map(
    ([asset, value]) => selectCoins(availableUtxos, asset, Number(value))
  );

  $: numberOfSelectedUtxos = coinSelectionResults.reduce(
    (acc, res) => acc + res.selected.length,
    0
  );

  $: numberOfChangeOutputs = coinSelectionResults.reduce(
    (acc, res) => (acc + res.change > 0 ? 1 : 0),
    0
  );

  $: {
    console.log(selectedOutputs);
    console.log(coinSelectionResults);
    console.log(targets);
  }

  let onSave = async () => {
    const changeAddresses = await Promise.all(
      Array(numberOfChangeOutputs).map(() =>
        $marinaStore.provider.getNextChangeAddress()
      )
    );
    let changeIndex = 0;

    for (const { selected, change } of coinSelectionResults) {
      for (const utxo of selected) {
        contractStore.update(addInput(utxo));
      }

      if (change > 0) {
        contractStore.update(
          addRecipientOutput(
            changeAddresses[changeIndex].confidentialAddress,
            change,
            selected[0].blindingData.asset ||
              AssetHash.fromBytes(selected[0].witnessUtxo.asset).hex
          )
        );
      }
    }
  };
</script>

<BaseModal
  title="Coin selection"
  {onSave}
  onSaveDisabled={selectedOutputs.every((o) => !o)}
  {onClose}
>
  <div class="container">
    <h4 class="title is-size-4">Select the outputs to target</h4>
    <p class="is-italic">
      {availableUtxos.length} utxos available on your wallet
    </p>
    <br />
    {#each $contractStore.outputs as output, index}
      <div class="field">
        <div class="control">
          <label class="checkbox is-flex">
            <input
              class="mr-2"
              type="checkbox"
              bind:checked={selectedOutputs[index]}
            />
            <div class="is-flex is-justify-content-space-between">
              <p class="mr-1">output #{index} -</p>
              <LiquidValue
                sats={output.value}
                ticker={$assetsStore.get(output.asset)?.ticker}
                precision={$assetsStore.get(output.asset)?.precision}
              />
            </div>
          </label>
        </div>
      </div>
    {/each}
    {#if numberOfSelectedUtxos}
      <p class="help is-info is-size-6">
        {numberOfSelectedUtxos} inputs has been selected
      </p>
    {/if}
    {#if numberOfChangeOutputs}
      <p class="help is-info is-size-6">
        {numberOfChangeOutputs} change outputs will be created
      </p>
    {/if}
  </div>
</BaseModal>
