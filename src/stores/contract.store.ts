import type { Argument, Contract, Transaction } from '@ionio-lang/ionio';
import { Updater, writable } from 'svelte/store';
import type { IonioUtxo } from './covenants.store';
import { AssetHash, address, confidential } from 'liquidjs-lib';
import type { Utxo } from 'marina-provider';
import type { Output } from '../application/output';

type ContractState = {
      tx?: Transaction;
      contract?: Contract;
      inputs: Utxo[];
      outputs: Output[];
    }
  ;

export const contractStore = writable<ContractState>({
  tx: undefined,
  contract: undefined,
  inputs: [],
  outputs: [],
});

const OP_RETURN_SCRIPT = Buffer.from('6a', 'hex');

function castBlindingData(
  data: Utxo['blindingData']
): confidential.UnblindOutputResult | undefined {
  if (!data) return undefined;
  return {
    value: data.value.toString(),
    asset: AssetHash.fromHex(data.asset).bytesWithoutPrefix,
    assetBlindingFactor: Buffer.from(data.assetBlindingFactor, 'hex'),
    valueBlindingFactor: Buffer.from(data.valueBlindingFactor, 'hex'),
  };
}

export function clear(): Updater<ContractState> {
  return () => undefined;
}

// init set up the covenant utxo and the initial contract
export function init(
  utxo: IonioUtxo,
  initialContract: Contract
): Updater<ContractState> {
  return () => {
    const contract = initialContract.from(
      utxo.txid,
      utxo.vout,
      utxo.witnessUtxo,
      castBlindingData(utxo.blindingData)
    );

    return {
      tx: undefined,
      contract,
      inputs: [utxo],
      outputs: [],
    };
  };
}

// apply a covenant function to the contract
export function apply(
  functionName: string,
  ...args: Argument[]
): Updater<ContractState> {
  return (state) => {
    if (!state) return state;
    if (state.tx) throw new Error('Covenant function already choosen, cannot');

    if (!state.contract.functions[functionName]) {
      throw new Error(`Function ${functionName} not found`);
    }

    const tx = state.contract.functions[functionName](...args);

    return {
      ...state,
      tx,
    };
  };
}

export function addInput(
  utxo: Utxo,
): Updater<ContractState> {
  return (state) => {
    if (!state || !state.tx) return state;

    return {
      ...state,
      tx: state.tx.withUtxo({
        prevout: utxo.witnessUtxo,
        txid: utxo.txid,
        vout: utxo.vout,
        unblindData: castBlindingData(utxo.blindingData),
      }),
      inputs: [...state.inputs, utxo],
    };
  };
}

export function addRecipientOutput(
  addr: string,
  amount: number,
  asset: string,
): Updater<ContractState> {
  return (state) => {
    if (!state || !state.tx) return state;

    const shouldBlind = address.isConfidential(addr);

    return {
      ...state,
      tx: state.tx.withRecipient(
        addr,
        amount,
        asset,
        shouldBlind ? 0 : undefined
      ),
      outputs: [
        ...state.outputs,
        {
          asset,
          recipient: addr,
          amount,
          value: amount,
        },
      ]
    };
  };
}

export function addBurnOutput(
  amount: number,
  asset: string,
): Updater<ContractState> {
  return (state) => {
    if (!state || !state.tx) return state;

    return {
      ...state,
      tx: state.tx.withOpReturn(amount, asset),
      outputs: [
        ...state.outputs,
        {
          recipient: OP_RETURN_SCRIPT,
          asset,
          amount,
          value: amount,
        },
      ]
    };
  };
}

export function addFee(amount: number): Updater<ContractState> {
  return (state) => {
    if (!state || !state.tx) return state;

    return {
      ...state,
      tx: state.tx.withFeeOutput(amount),
      outputs: [
        ...state.outputs,
        {
          recipient: Buffer.alloc(0),
          asset: 'L-BTC',
          value: amount,
        },
      ]
    };
  };
}