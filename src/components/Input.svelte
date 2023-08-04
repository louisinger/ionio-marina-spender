<script type="ts">
  import classNames from 'classnames';
  import { AssetHash, ElementsValue, script } from 'liquidjs-lib';
  import type { Utxo } from 'marina-provider';
  import { isConfidential } from '../application/guard';
  import LiquidValue from './common/LiquidValue.svelte';

  export let utxo: Utxo;

  $: previousScriptPubKey = utxo.witnessUtxo?.script.toString('hex');
  $: amount = isConfidential(utxo)
    ? utxo.blindingData.value
    : ElementsValue.fromBytes(utxo.witnessUtxo?.value).number;
  $: asset = isConfidential(utxo)
    ? utxo.blindingData.asset
    : AssetHash.fromBytes(utxo.witnessUtxo?.asset).toString();

  let isOpen = false;

  $: details = [
    { name: 'previous txID', value: utxo.txid },
    { name: 'previous output index', value: utxo.vout },
    { name: 'scriptPubKey', value: previousScriptPubKey },
    {
      name: 'scriptPubKey (ASM)',
      value: script.toASM(utxo.witnessUtxo?.script),
    },
    {
      name: 'amount',
      value: amount,
    },
    {
      name: 'asset',
      value: asset,
    },
  ];
</script>

<div class="card">
  <header class="card-header">
    <LiquidValue className="card-header-title" sats={amount} ticker={'??'} />
    <button class="card-header-icon" aria-label="more options">
      <span class="icon">
        <i
          class={classNames('fa', {
            'fa-angle-down': !isOpen,
            'fa-angle-up': isOpen,
          })}
          aria-hidden="true"
          on:click={() => (isOpen = !isOpen)}
        />
      </span>
    </button>
  </header>
  <div class="card-content">
    <div class="content">
      {#if isOpen}
        <table>
          <tbody>
            {#each details as detail}
              <tr>
                <td>{detail.name}</td>
                <td>{detail.value}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      {/if}
    </div>
  </div>
</div>
