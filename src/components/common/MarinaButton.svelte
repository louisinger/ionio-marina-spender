<script lang="ts">
  import { onMount } from 'svelte';
  import { initProvider, marinaStore } from '../../stores/marina.store';
  import { Page, goto, navigationStore } from '../../stores/navigation.store';

  $: disabled = $marinaStore.provider === undefined;

  onMount(() => {
    initProvider().then((provider) => {
      marinaStore.set(provider);
    });
  })


  const onClick = async () => {
    const isEnabled = await $marinaStore.provider?.isEnabled();
    if (!isEnabled) {
        await $marinaStore.provider.enable();
        marinaStore.set(await initProvider())
    }

    navigationStore.update(goto(Page.Send));
  };
</script>

<button class="button is-link" {disabled} on:click={onClick}>
    Marina covenants
</button>
