<script type="ts">
  export let title: string;
  export let onSaveDisabled = false;
  export let onSave: () => void;
  export let onClose: () => void;

</script>

<div class='modal custom-modal is-active'>
  <div class="modal-background" />
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">{title}</p>
      <button on:click={onClose} class="delete" aria-label="close" />
    </header>
    <section class="modal-card-body">
      <slot />
    </section>
    <footer class="modal-card-foot">
      <button
        class="button is-success"
        on:click={() => {
          onSave();
          onClose();
        }}
        disabled={onSaveDisabled}
      >
        Save
      </button>
      <button class="button is-danger" on:click={onClose}>Cancel</button>
    </footer>
  </div>
</div>
