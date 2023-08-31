import type { Artifact } from '@ionio-lang/ionio';
import { ElementsValue } from 'liquidjs-lib';
import type { Utxo } from 'marina-provider';

export function isConfidential(utxo: Utxo): boolean {
  return ElementsValue.fromBytes(utxo.witnessUtxo.value).isConfidential;
}

export function isArtifact(obj: unknown): obj is Artifact {
  return typeof obj === 'object' &&
    obj['contractName'] &&
    obj['constructorInputs'] &&
    obj['functions'] &&
    typeof obj['contractName'] === 'string' &&
    Array.isArray(obj['constructorInputs']) &&
    Array.isArray(obj['functions']);
}