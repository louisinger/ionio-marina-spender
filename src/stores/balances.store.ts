import {
  AccountType,
  Balance,
  MarinaProvider,
} from 'marina-provider';
import { derived } from 'svelte/store';
import { marinaStore } from './marina.store';

async function getBalances(p: MarinaProvider) {
  const accountIDs = await p.getAccountsIDs();
  const accountsInfos = await Promise.all(
    accountIDs.map((account) => p.getAccountInfo(account))
  );
  const p2wshAccounts = accountsInfos.filter(
    (accountInfo) => accountInfo.type === AccountType.P2WPKH
  );

  return p.getBalances(p2wshAccounts.map((a) => a.accountID));
}

export const balancesStore = derived<typeof marinaStore, Balance[]>(
  marinaStore,
  ($marinaStore, set) => {
    if ($marinaStore.provider && $marinaStore.enabled) {
      getBalances($marinaStore.provider)
        .then(set)
        .catch(console.error);
    }
  },
  []
);
