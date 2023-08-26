<script lang="ts">
  import { isIonioScriptDetails } from 'marina-provider';
  import { contractStore } from '../../stores/contract.store';
  import IonioRequireNotification from '../common/IonioRequireNotification.svelte';

  let notifications = [];

  contractStore.subscribe((contractState) => {
    if (
      contractState.tx &&
      isIonioScriptDetails(contractState.inputs[0].scriptDetails)
    ) {
      const artifact = contractState.inputs[0].scriptDetails.artifact;

      notifications = artifact.functions.find(
        (fn) => fn.name === contractState.functionApplied
      ).require;
    }
  });
</script>

{#each notifications as notification}
  <IonioRequireNotification requirement={notification} />
{/each}
