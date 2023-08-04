<script type="ts">
  import classNames from 'classnames';
  import { scriptHex, Output } from '../application/output';
  import LiquidValue from './common/LiquidValue.svelte';

  export let output: Output;

  $: details = [
    { name: 'scriptPubKey', value: scriptHex(output) },
    { name: 'amount', value: output.value },
    { name: 'asset', value: output.asset },
  ];

  let isOpen = false;
</script>

<div class="card">
  <header class="card-header">
    <LiquidValue className="card-header-title" sats={output.value} ticker={'??'} />
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
