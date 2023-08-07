<script type="ts">
  import { Argument, Parameter, PrimitiveType } from '@ionio-lang/ionio';
  import { script } from 'liquidjs-lib';

  export let parameter: Parameter;
  export let onChange: (value: Argument) => void;

  let value: string = '';

  function getPlaceHolderFromPrimitiveType(type: PrimitiveType): string {
    switch (type) {
      case PrimitiveType.Asset:
        return '0dea022a8a25abb128b42b0f8e98532bc8bd74f8a77dc81251afcc13168acef7';
      case PrimitiveType.Bytes:
        return '0xdeadbeef (0x prefix required)';
      case PrimitiveType.Number:
        return '666';
      case PrimitiveType.Value:
        return '4555800 (satoshis)';
      case PrimitiveType.DataSignature:
        return '64 bytes schnorr signature';
      case PrimitiveType.PublicKey:
        return '33-bytes compressed public key';
      case PrimitiveType.XOnlyPublicKey:
        return '32-bytes x-only public key';
      case PrimitiveType.UInt64:
        return '64-bit unsigned integer';
      case PrimitiveType.Boolean:
        return '"true" or "false"';
      case PrimitiveType.Signature:
        return "handled by marina signer, you don't need to fill this field";
      default:
        return '????';
    }
  }

  function castString(s: string, type: PrimitiveType): Argument {
    switch (type) {
      case PrimitiveType.Asset:
        return s;
      case PrimitiveType.Bytes:
        return s;
      case PrimitiveType.Number:
        return script.number.encode(parseInt(s));
      case PrimitiveType.Value:
        return s;
      case PrimitiveType.DataSignature:
        return s;
      case PrimitiveType.PublicKey:
        return s;
      case PrimitiveType.XOnlyPublicKey:
        return s;
      case PrimitiveType.UInt64:
        return parseInt(s);
      case PrimitiveType.Boolean:
        return s === 'true';
      case PrimitiveType.Signature:
        return s;
      default:
        return s;
    }
  }

  $: id = parameter.name + parameter.type;
</script>

<div class="field is-horizontal">
  <div class="field-label is-normal">
    <label for={id} class="label">{parameter.name}</label>
  </div>
  <div class="field-body">
    <div class="field">
      <p class="control">
        <input
          {id}
          class="input"
          type="text"
          placeholder={getPlaceHolderFromPrimitiveType(parameter.type)}
          disabled={parameter.type === PrimitiveType.Signature}
          bind:value={value}
          on:input={() => onChange(castString(value, parameter.type))}
        />
      </p>
    </div>
  </div>
</div>
