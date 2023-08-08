<script type="ts">
  import classNames from 'classnames';
  import { AssetHash, ElementsValue, script } from 'liquidjs-lib';
  import {
    IonioScriptDetails,
    isIonioScriptDetails,
    Utxo,
  } from 'marina-provider';
  import { isConfidential } from '../application/guard';
  import LiquidValue from './common/LiquidValue.svelte';
  import { assetsStore } from '../stores/assets.store';
  import { marinaStore } from '../stores/marina.store';
  import { contractStore, deleteInput } from '../stores/contract.store';

  export let utxo: Utxo;
  export let index: number;

  $: previousScriptPubKey = utxo.witnessUtxo?.script.toString('hex');
  $: amount =
    utxo.blindingData.value ||
    ElementsValue.fromBytes(utxo.witnessUtxo?.value).number;
  $: asset =
    utxo.blindingData.asset || AssetHash.fromBytes(utxo.witnessUtxo?.asset).hex;
  $: assetDetails = $assetsStore.get(asset) ?? {
    ticker: asset.slice(0, 4).toUpperCase(),
    precision: 8,
  };

  let isOpen = false;

  $: details = [
    { name: 'ID', value: utxo.txid },
    { name: 'vout', value: utxo.vout },
    { name: 'script hex', value: previousScriptPubKey },
    {
      name: 'script ASM',
      value: script.toASM(utxo.witnessUtxo?.script),
    },
    {
      name: 'satoshis',
      value: amount,
    },
    {
      name: 'precision',
      value: assetDetails.precision,
    },
    {
      name: 'asset',
      value: asset,
    },
    {
      name: 'confidential',
      value: isConfidential(utxo),
    },
  ];

  $: covenantDetails = isIonioScriptDetails(utxo.scriptDetails)
    ? [
      { name: 'covenant', value: utxo.scriptDetails.artifact.contractName },
      ...utxo.scriptDetails.params.map((param, index) => ({
        name: (utxo.scriptDetails as IonioScriptDetails).artifact
          .constructorInputs[index].name,
        value: param,
      })),
    ]
    : [];

  $: explorerLink = `https://liquid.network/${$marinaStore.network}/tx/${utxo.txid}`;
</script>

<div class="card m-1">
  <header class="card-header primary-hover" on:click={() => (isOpen = !isOpen)}>
    <div class="card-header-icon">
      <span class="icon">
        #{index}
      </span>
    </div>
    <div
      class="card-header-title is-flex is-align-content-start is-flex-direction-column"
    >
      <LiquidValue
        sats={amount}
        ticker={assetDetails.ticker}
        precision={assetDetails.precision}
      />
      <p class="is-size-7 has-text-weight-light">{utxo.txid}:{utxo.vout}</p>
    </div>

    <button class="card-header-icon" aria-label="more options">
      <span class="icon">
        <i
          class={classNames('fa', {
            'fa-angle-down': !isOpen,
            'fa-angle-up': isOpen,
          })}
          aria-hidden="true"
        />
      </span>
    </button>
  </header>
  {#if isOpen}
    <div class="card-content">
      <div class="content table-container">
        <table class="table is-striped">
          <tbody>
            {#each [...covenantDetails, ...details] as detail}
              <tr>
                <td class="is-size-7">{detail.name}</td>
                <td class="is-size-7">{detail.value}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  {/if}
  <footer class="card-footer">
    <a
      target="_blank"
      href={explorerLink}
      class="card-footer-item button is-info is-inverted"
    >
      <span class="icon is-small">
        <i class="fas fa-link" />
      </span>
      <span> EXPLORER </span>
    </a>
    <button
      on:click={() => contractStore.update(deleteInput(index))}
      disabled={index === 0}
      class="card-footer-item button is-danger is-inverted"
    >
      <span class="icon is-small">
        <i class="fas fa-trash" />
      </span>
      <span> DELETE </span>
    </button>
  </footer>
</div>
