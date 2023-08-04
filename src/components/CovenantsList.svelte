<script lang="ts">
  import secp256k1 from '@vulpemventures/secp256k1-zkp';
  import classNames from 'classnames';
  import { IonioUtxo, covenantStore } from '../stores/covenants.store';
  import { contractStore, init } from '../stores/contract.store';
  import { Contract } from '@ionio-lang/ionio';
  import { marinaStore } from 'svelte-marina-button';
  import { networks } from 'liquidjs-lib';

  let isActive = false;

  const toggle = () => {
    isActive = !isActive;
  };

  const select = async (covenant: IonioUtxo) => {
    isActive = false;
    const net = networks[$marinaStore.network]
    if (!net) throw new Error('Network not found')
    const zkpLib = await secp256k1();
    const contract = new Contract(
        covenant.scriptDetails.artifact, 
        covenant.scriptDetails.params, 
        net, 
        zkpLib
    );

    contractStore.update(init(covenant, contract));
  }
</script>

<div class={classNames('dropdown', { 'is-active': isActive })}>
  <div class="dropdown-trigger">
    <button
      class="button"
      on:click={toggle}
      aria-haspopup="true"
      aria-controls="dropdown-menu2"
    >
      <span>Content</span>
      <span class="icon is-small">
        <i class="fas fa-angle-down" aria-hidden="true" />
      </span>
    </button>
  </div>
  <div class="dropdown-menu" id="dropdown-menu2" role="menu">
    <div class="dropdown-content">
      {#each $covenantStore as covenant, index}
        <div on:click={() => select(covenant)} class="dropdown-item">
          <p class="has-text-weight-semibold has-text-primary">
            {covenant.scriptDetails.artifact.name}
          </p>
          <p>
            {covenant.blindingData.value}
            {covenant.blindingData.asset.slice(0, 8)}...
          </p>
        </div>
        {#if index < $covenantStore.length - 1}
          <hr class="dropdown-divider" />
        {/if}
      {/each}
      <div class="dropdown-item">
        <p>
          You can insert <strong>any type of content</strong> within the dropdown
          menu.
        </p>
      </div>
      <hr class="dropdown-divider" />
    </div>
  </div>
</div>
