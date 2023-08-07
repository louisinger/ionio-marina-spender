<script lang="ts">
  import classNames from 'classnames';
  import type { Utxo } from 'marina-provider';
  import { utxosStore } from '../stores/utxos.store';
  import LiquidValue from './common/LiquidValue.svelte';

  export let onSelect: (utxo: Utxo) => void;

  let isActive = false;
</script>

<div class={classNames('dropdown', { 'is-active': isActive })}>
  <div class="dropdown-trigger">
    <button
      on:click={() => (isActive = !isActive)}
      class="button"
      aria-haspopup="true"
      aria-controls="dropdown-menu"
    >
      <span>Select utxo</span>
      <span class="icon is-small">
        <i class="fas fa-angle-down" aria-hidden="true" />
      </span>
    </button>
  </div>
  <div class="dropdown-menu" id="dropdown-menu" role="menu">
    <div class="dropdown-content">
      {#each $utxosStore as utxo}
        <div
          class="dropdown-item"
          on:click={() => {
            isActive = false;
            onSelect(utxo);
          }}
        >
          <p>{utxo.txid}:{utxo.vout}</p>
          <LiquidValue
            sats={utxo.blindingData.value}
            ticker={utxo.blindingData.asset.slice(0, 5)}
          />
        </div>
      {/each}
    </div>
  </div>
</div>
