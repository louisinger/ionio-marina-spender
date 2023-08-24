<script lang="ts">
  import classNames from 'classnames';
  import { assetsStore } from '../../stores/assets.store';
  import type { IonioUtxo } from '../../stores/covenants.store';

  export let covenant: IonioUtxo;
  export let onClick: () => void | undefined = undefined;

  $: formatValue = (sats: number, asset: string) => {
    const precision = $assetsStore.get(asset)
      ? $assetsStore.get(asset).precision
      : 8;
    return (sats / 10 ** precision).toFixed(precision);
  };

  $: formatAsset = (asset: string) => {
    return $assetsStore.get(asset)
      ? $assetsStore.get(asset).ticker
      : asset.slice(0, 5).toUpperCase();
  };
</script>

<div
  on:click={onClick}
  on:keydown={() => {
    if (onClick !== undefined) onClick();
  }}
  class={classNames('box mt-2', { 'primary-hover': onClick !== undefined })}
>
  <p class="has-text-weight-semibold has-text-primary">
    {covenant.txid}:{covenant.vout}
  </p>
  <p>
    Contract
    <span class="has-text-primary">
      {covenant.scriptDetails.artifact.contractName}
    </span>
  </p>
  <p class="is-size-2">
    {formatValue(covenant.blindingData.value, covenant.blindingData.asset)}
    {formatAsset(covenant.blindingData.asset)}
  </p>
</div>
