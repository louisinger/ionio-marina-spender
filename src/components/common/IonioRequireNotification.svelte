<script lang="ts">
  import type { Requirement } from '@ionio-lang/ionio';

  export let requirement: Requirement;

  function safeToString(r: Requirement['expected']): string {
    if (typeof r === 'object') {
      return JSON.stringify(r);
    }
    return r.toString();
  }

  $: text = `${requirement.type} #${requirement.atIndex ?? 'any'}`;
</script>

<div class="notification is-size-7">
  <span class="icon">
    <i class="fas fa-exclamation-triangle" />
  </span>
  <span>
    covenant requires <span class="has-text-weight-semibold">{text}</span> to be
    <span class="is-family-code">{safeToString(requirement.expected)}</span>
  </span>
</div>
