<script lang="ts">
  import secp256k1 from '@vulpemventures/secp256k1-zkp';
  import { IonioUtxo, covenantStore } from '../stores/covenants.store';
  import { contractStore, init } from '../stores/contract.store';
  import { Contract } from '@ionio-lang/ionio';
  import { networks } from 'liquidjs-lib';
  import { marinaStore } from '../stores/marina.store';
  import UtxoCovenantBox from './common/UtxoCovenantBox.svelte';

  const select = async (covenant: IonioUtxo) => {
    if (!$marinaStore.provider)
      throw new Error('Provider not found, please connect or install Marina');
    const network = await $marinaStore.provider.getNetwork();
    const net = networks[network];
    if (!net) throw new Error('Network not found');
    const zkpLib = await secp256k1();
    const contract = new Contract(
      covenant.scriptDetails.artifact,
      covenant.scriptDetails.params,
      net,
      zkpLib
    );

    contractStore.update(init(covenant, contract));
  };
</script>

<div class="container">
  {#each $covenantStore as covenant}
    <UtxoCovenantBox {covenant} onClick={() => select(covenant)} />
  {/each}
</div>
