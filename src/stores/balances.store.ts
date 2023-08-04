import { AccountType, Balance, detectProvider } from 'marina-provider';
import { marinaStore } from 'svelte-marina-button';
import { derived } from 'svelte/store';

export const balancesStore = derived<typeof marinaStore, Balance[]>(
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

          return p.getBalances(p2wshAccounts.map((a) => a.accountID));
        })
        .then((balances) => set(balances))
        .catch(console.error);
    }
  }
);