<script type="ts">
  import type { Utxo } from 'marina-provider';
  import { addInput, contractStore } from '../../stores/contract.store';
  import { assetsStore } from '../../stores/assets.store';
  import BaseModal from '../common/BaseModal.svelte';
  import DropdownUtxos from './DropdownUtxos.svelte';
  import LiquidValue from '../common/LiquidValue.svelte';

  export let onClose: () => void;

  let selected: Utxo = undefined;

  let onSave = () => {
    if (!selected) throw new Error('no utxo selected');
    contractStore.update(addInput(selected));
  };
</script>

<BaseModal
  title="add a single input to PSET"
  {onSave}
  onSaveDisabled={!selected}
  {onClose}
>
  <div class="container">
    <DropdownUtxos onSelect={(utxo) => (selected = utxo)} />
    {#if selected}
      <div class="box is-flex is-align-content-center is-flex-direction-column">
        <p class="is-size-7">{selected.txid}:{selected.vout}</p>
        <LiquidValue
          sats={selected.blindingData.value}
          ticker={$assetsStore.get(selected.blindingData.asset)?.ticker}
          precision={$assetsStore.get(selected.blindingData.asset)?.precision}
        />
      </div>
    {/if}
  </div>
</BaseModal>
