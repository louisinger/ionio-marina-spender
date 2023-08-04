import {
  AccountType,
  IonioScriptDetails,
  MarinaProvider,
  Utxo,
  detectProvider,
  isIonioScriptDetails,
} from 'marina-provider';
import { marinaStore } from 'svelte-marina-button';
import { derived } from 'svelte/store';

export type IonioUtxo = Utxo & {
  scriptDetails: IonioScriptDetails;
};

function isIonioUtxo(u: Utxo): u is IonioUtxo {
  return isIonioScriptDetails(u.scriptDetails);
}

async function computeIonioUtxos(
  marinaProvider: MarinaProvider
): Promise<IonioUtxo[]> {
  const accounts = await marinaProvider.getAccountsIDs();
  const accountsInfos = await Promise.all(
    accounts.map((account) => marinaProvider.getAccountInfo(account))
  );
  const ionioAccounts = accountsInfos.filter(
    (accountInfo) => accountInfo.type === AccountType.Ionio
  );
  const utxos = await marinaProvider.getCoins(
    ionioAccounts.map((a) => a.accountID)
  );
  return utxos.filter(isIonioUtxo);
}

export const covenantStore = derived<typeof marinaStore, IonioUtxo[]>(marinaStore, ($marinaStore, set) => {
  set([]);
  if ($marinaStore.installed && $marinaStore.enabled) {
    detectProvider('marina', 5000).then(computeIonioUtxos).then(set);
  } 
});
