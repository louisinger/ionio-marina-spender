import { MarinaProvider, detectProvider } from 'marina-provider';
import { writable } from 'svelte/store';

export type MarinaState = {
  enabled: boolean;
  provider?: MarinaProvider;
};

export const initProvider = async (): Promise<MarinaState> => {
  const provider = await detectProvider('marina', 10_000);

  if (provider) {
    const enabled = await provider.isEnabled();

    return {
      enabled,
      provider,
    };
  }

  return {
    enabled: false,
    provider: window['marina'],
  };
};

export const marinaStore = writable<MarinaState>(
  {
    enabled: false,
    provider: window['marina'],
  },
  (set) => {
    initProvider().then((state) => set(state)).catch(console.error);
  }
);
