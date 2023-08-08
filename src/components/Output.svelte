<script type="ts">
  import classNames from 'classnames';
  import { assetsStore } from '../stores/assets.store';
  import { scriptHex, Output, scriptBuffer } from '../application/output';
  import LiquidValue from './common/LiquidValue.svelte';
  import { script } from 'liquidjs-lib';
  import { contractStore, deleteOutput } from '../stores/contract.store';

  export let output: Output;
  export let index: number;

  $: details = [
    {
      name: 'address',
      value: typeof output.recipient === 'string' ? output.recipient : '???',
    },
    { name: 'script hex', value: scriptHex(output) },
    {
      name: 'script ASM',
      value: script.toASM(scriptBuffer(output)),
    },
    { name: 'satoshis', value: output.value },
    { name: 'precision', value: $assetsStore.get(output.asset)?.precision },
    { name: 'asset', value: output.asset },
  ];

  let isOpen = false;
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
        sats={output.value}
        ticker={$assetsStore.get(output.asset)?.ticker}
        precision={$assetsStore.get(output.asset)?.precision}
      />
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
            {#each details as detail}
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
    <button
      on:click={() => contractStore.update(deleteOutput(index))}
      class="card-footer-item button is-danger is-inverted"
    >
      <span class="icon is-small">
        <i class="fas fa-trash" />
      </span>
      <span> DELETE </span>
    </button>
  </footer>
</div>
