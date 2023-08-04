<script type="ts">
  import type { Utxo } from 'marina-provider';
  import { addInput, contractStore } from '../stores/contract.store';
  import BaseModal from './common/BaseModal.svelte';
  import DropdownUtxos from './DropdownUtxos.svelte';
  import LiquidValue from './common/LiquidValue.svelte';

  export let open: boolean;

  let selected: Utxo = undefined;

  let onSave = () => {
    if (!selected) throw new Error('no utxo selected');
    contractStore.update(addInput(selected));
  };
</script>

<BaseModal
  title="add input to contract"
  {onSave}
  onSaveDisabled={!selected}
  isActive={open}
>
  <div class="container">
    <h4>Select the utxo to add</h4>
    <DropdownUtxos onSelect={(utxo) => (selected = utxo)} />
    {#if selected}
      <p class="is-success">Utxo selected!</p>
      <div class="box">
        <p>{selected.txid}:{selected.vout}</p>
        <LiquidValue
          sats={selected.blindingData.value}
          ticker={selected.blindingData.asset.slice(0, 5)}
        />
      </div>
    {/if}
  </div>
</BaseModal>
