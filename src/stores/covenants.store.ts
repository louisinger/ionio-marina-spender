import {
  AccountType,
  IonioScriptDetails,
  MarinaProvider,
  Utxo,
  isIonioScriptDetails,
} from 'marina-provider';
import { derived } from 'svelte/store';
import { marinaStore } from './marina.store';

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
  if ($marinaStore.provider && $marinaStore.enabled) {
    computeIonioUtxos($marinaStore.provider).then(set);
  }
}, []);
