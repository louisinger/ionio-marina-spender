<script lang="ts">
    export let className: string = '';
    export let sats: number;
    export let precision = 8;
    export let ticker: string;

    $: value = sats * 10 ** -precision;
</script>

<p class={className}>
    <span class="has-text-weight-semibold has-text-primary">{value.toLocaleString()}</span> {ticker}
</p>