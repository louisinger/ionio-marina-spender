import { AccountType, detectProvider, Utxo } from 'marina-provider';
import { marinaStore } from 'svelte-marina-button';
import { derived } from 'svelte/store';

export const utxosStore = derived<typeof marinaStore, Utxo[]>(
  marinaStore,
  ($marinaStore, set) => {
    if ($marinaStore.installed && $marinaStore.enabled) {
      detectProvider('marina', 5000)
        .then(async (p) => {
          const accountIDs = await p.getAccountsIDs();
          const accountsInfos = await Promise.all(
            accountIDs.map((account) => p.getAccountInfo(account))
          );
          const p2wshAccounts = accountsInfos.filter(
            (accountInfo) => accountInfo.type === AccountType.P2WPKH
          );

          return p.getCoins(p2wshAccounts.map((a) => a.accountID));
        })
        .then((utxos) => set(utxos))
        .catch(console.error);
    } else {
      set([]);
    }
  }
);
