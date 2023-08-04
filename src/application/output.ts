import { address } from 'liquidjs-lib';

type Script = Buffer;
type Address = string;

export type Output = {
    readonly recipient: Script | Address;
    readonly value: number;
    readonly asset: string;
}

export function scriptHex(output: Output): string {
  if (typeof output.recipient === 'string') {
    return address.toOutputScript(output.recipient).toString('hex');
  }

  return output.recipient.toString('hex');
}