<script lang="ts">
  import { Tooltip } from '@svelte-plugins/tooltips';

  export let content: string;
</script>

<Tooltip
  class="icon is-small"
  position="bottom"
  trigger="mouseenter"
  {content}
  animation="fade"
>
  <span class="icon is-small has-text-grey-light">
    <i class="fas fa-info-circle" />
  </span>
</Tooltip>
