import { ElementsValue } from 'liquidjs-lib';
import type { Utxo } from 'marina-provider';

export function isConfidential(utxo: Utxo): boolean {
  return ElementsValue.fromBytes(utxo.witnessUtxo.value).isConfidential;
}