import {
  AccountType,
  MarinaProvider,
  Utxo,
} from 'marina-provider';
import { derived } from 'svelte/store';
import { marinaStore } from './marina.store';

async function getUtxos(p: MarinaProvider) {
  const accountIDs = await p.getAccountsIDs();
  const accountsInfos = await Promise.all(
    accountIDs.map((account) => p.getAccountInfo(account))
  );
  const p2wshAccounts = accountsInfos.filter(
    (accountInfo) => accountInfo.type === AccountType.P2WPKH
  );

  return p.getCoins(p2wshAccounts.map((a) => a.accountID));
}

export const utxosStore = derived<typeof marinaStore, Utxo[]>(
  marinaStore,
  ($marinaStore, set) => {
    if ($marinaStore.provider && $marinaStore.enabled) {
      getUtxos($marinaStore.provider)
        .then(set)
        .catch(console.error);
    } else {
      set([]);
    }
  },
  []
);
