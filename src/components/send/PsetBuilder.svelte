<script>
  import classNames from 'classnames';
  import { contractStore, unlock } from '../../stores/contract.store';
  import AddInputModal from './AddInputModal.svelte';
  import Input from './Input.svelte';
  import Output from './Output.svelte';
  import RequirementsNotifications from './RequirementsNotifications.svelte';
  import AddOutputModal from './AddOutputModal.svelte';
  import CoinSelectionModal from './CoinSelectionModal.svelte';
  import { marinaStore } from '../../stores/marina.store';

  let addInputModalOpen = false;
  let addOutputModalOpen = false;
  let coinSelectionModalOpen = false;

  const buttons = [
    {
      icon: 'fa-plus',
      name: 'Input',
      handler: () => (addInputModalOpen = true),
    },
    {
      icon: 'fa-plus',
      name: 'Output',
      handler: () => (addOutputModalOpen = true),
    },
    {
      icon: 'fa-coins',
      name: 'Coin Selection',
      handler: () => (coinSelectionModalOpen = true),
    },
  ];

  let unlockButtonLoading = false;
  let broadcastButtonLoading = false;

  const unlockContract = async () => {
    unlockButtonLoading = true;
    try {
      contractStore.update(await unlock($contractStore.tx));
    } catch (e) {
      console.error(e);
    } finally {
      unlockButtonLoading = false;
    }
  };

  let txID = '';

  $: explorerLink = `https://liquid.network/${$marinaStore.network}/tx/${txID}`;

  const broadcastContract = async () => {
    broadcastButtonLoading = true;
    try {
      txID = (
        await $marinaStore.provider.broadcastTransaction(
          $contractStore.signedTxHex
        )
      ).txid;
    } catch (e) {
      console.error(e);
    } finally {
      broadcastButtonLoading = false;
    }
  };
</script>

<div class="container columns v-centered">
  {#if addInputModalOpen}
    <AddInputModal onClose={() => (addInputModalOpen = false)} />
  {/if}

  {#if addOutputModalOpen}
    <AddOutputModal onClose={() => (addOutputModalOpen = false)} />
  {/if}

  {#if coinSelectionModalOpen}
    <CoinSelectionModal onClose={() => (coinSelectionModalOpen = false)} />
  {/if}

  <div class="column">
    <h4 class="title has-text-centered">
      How do you want to spend this covenant?
    </h4>
    <RequirementsNotifications />

    <div class="field is-grouped">
      {#each buttons as button}
        <p class="control">
          <button class="button is-primary" on:click={button.handler}>
            <span class="icon is-small">
              <i class={classNames('fa', button.icon)} />
            </span>
            <span>{button.name}</span>
          </button>
        </p>
      {/each}
    </div>
  </div>
</div>

<div class="container columns is-desktop">
  <div class="column is-half">
    {#each $contractStore.inputs as input, index}
      <Input utxo={input} {index} />
    {/each}
  </div>

  <div class="column is-half">
    {#each $contractStore.outputs as output, index}
      <Output {output} {index} />
    {/each}
  </div>
</div>

<button
  class={classNames('button is-primary is-fullwidth mt-2', {
    'is-loading': unlockButtonLoading,
  })}
  disabled={$contractStore.inputs.length === 0 ||
    $contractStore.outputs.length === 0}
  on:click={unlockContract}
>
  UNLOCK
</button>

{#if $contractStore.signedTxHex}
  <button
    class={classNames('button is-primary is-fullwidth mt-2', {
      'is-loading': broadcastButtonLoading,
    })}
    on:click={broadcastContract}
  >
    Broadcast
  </button>
{/if}

{#if txID}
  Contract broadcasted! <a target="_blank" href={explorerLink}>
    {txID}
  </a>
{/if}
