<script lang="ts">
  import classNames from 'classnames';
  import type { Utxo } from 'marina-provider';
  import { utxosStore } from '../../stores/utxos.store';
  import { assetsStore } from '../../stores/assets.store';
  import LiquidValue from '../common/LiquidValue.svelte';

  export let onSelect: (utxo: Utxo) => void;

  let hasBeenSelected = false;

  $: text = hasBeenSelected ? 'Utxo selected!' : 'Select utxo';

  let isActive = true;
</script>

<div class={classNames('dropdown', { 'is-active': isActive })}>
  <div class="dropdown-trigger">
    <button
      on:click={() => (isActive = !isActive)}
      class="button"
      aria-haspopup="true"
      aria-controls="dropdown-menu"
    >
      <span>{text}</span>
      <span class="icon is-small">
        <i class="fas fa-angle-down" aria-hidden="true" />
      </span>
    </button>
  </div>
  <div class="dropdown-menu" id="dropdown-menu" role="menu">
    <div class="dropdown-content">
      {#each $utxosStore as utxo, index}
        <div class="primary-hover">
          <div
            on:keydown={() => {
              if (onSelect !== undefined) onSelect(utxo);
            }}
            class="dropdown-item"
            on:click={() => {
              isActive = false;
              hasBeenSelected = true;
              onSelect(utxo);
            }}
          >
            <p class="is-size-7">{utxo.txid}:{utxo.vout}</p>
            <LiquidValue
              sats={utxo.blindingData.value}
              ticker={$assetsStore.get(utxo.blindingData.asset)?.ticker}
              precision={$assetsStore.get(utxo.blindingData.asset)?.precision}
            />
          </div>
          {#if index < $utxosStore.length - 1}
            <hr class="dropdown-divider" />
          {/if}
        </div>
      {/each}
    </div>
  </div>
</div>
