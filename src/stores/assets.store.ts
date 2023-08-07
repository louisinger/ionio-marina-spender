import { derived } from 'svelte/store';
import { balancesStore } from './balances.store';
import type { Asset } from 'marina-provider';

type AssetState = {
  assets: Asset[];
  get: (assetID: string) => Asset | undefined;
};

export const assetsStore = derived<typeof balancesStore, AssetState>(
  balancesStore,
  ($balancesStore, set) => {
    const assets = $balancesStore.map((b) => b.asset);
    set({ assets, get: assetGetter(assets) });
  },
  { assets: [], get: () => undefined }
);

export function assetGetter(state: Asset[]) {
  return (assetID: string) => state.find((a) => a.assetHash === assetID);
}
