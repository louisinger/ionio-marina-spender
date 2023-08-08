import { MarinaProvider, detectProvider } from 'marina-provider';
import { writable } from 'svelte/store';

export type MarinaState = {
  enabled: boolean;
  network: string;
  provider?: MarinaProvider;
};

export const initProvider = async (): Promise<MarinaState> => {
  const provider = await detectProvider('marina', 10_000);

  if (provider) {
    const enabled = await provider.isEnabled();
    const network = await provider.getNetwork();

    return {
      enabled,
      provider,
      network,
    };
  }

  const network = await provider.getNetwork();

  return {
    enabled: false,
    provider: window['marina'],
    network,
  };
};

export const marinaStore = writable<MarinaState>(
  {
    enabled: false,
    provider: window['marina'],
    network: 'liquid',
  },
  (set) => {
    initProvider().then((state) => set(state)).catch(console.error);
  }
);
