<script type="ts">
  import {
    addBurnOutput,
    addFee,
    addRecipientOutput,
    contractStore,
  } from '../../stores/contract.store';
  import BaseModal from '../common/BaseModal.svelte';
  import OutputForm from '../common/OutputForm.svelte';

  export let onClose: () => void;

  let outputAddress = '';
  let asset = '';
  let amount = 0;
  let isBurn = false;
  let isFee = false;

  $: disabled = (!isFee && !isBurn && !outputAddress) || !asset || !amount;

  let onSave = () => {
    if (disabled) throw new Error('invalid output');

    if (isBurn) {
      contractStore.update(addBurnOutput(amount, asset));
      return;
    }

    if (isFee) {
      contractStore.update(addFee(amount, asset));
      return;
    }

    contractStore.update(addRecipientOutput(outputAddress, amount, asset));
  };
</script>

<BaseModal
  title="add output to PSET"
  {onSave}
  onSaveDisabled={disabled}
  {onClose}
>
  <div class="container">
    <OutputForm
      bind:address={outputAddress}
      bind:asset
      bind:satoshis={amount}
      bind:isBurn
      bind:isFee
    />
  </div>
</BaseModal>
