<script type="ts">
  import { Parameter, PrimitiveType } from '@ionio-lang/ionio';

  export let parameter: Parameter;
  export let onChange: (value: string) => void;

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
        return 'true or false';
      case PrimitiveType.Signature:
        return "handled by marina signer, you don't need to fill this field";
      default:
        return '????';
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
          {value}
          on:input={() => onChange(value)}
        />
      </p>
    </div>
  </div>
</div>
