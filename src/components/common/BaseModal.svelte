<script type="ts">
  import classNames from 'classnames';

  export let title: string;
  export let onSaveDisabled = false;
  export let onSave: () => void;
  export let isActive = false;

  const close = () => {
    isActive = false;
  };
</script>

<div class={classNames('modal', { 'is-active': isActive })}>
  <div class="modal-background" />
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">{title}</p>
      <button on:click={close} class="delete" aria-label="close" />
    </header>
    <section class="modal-card-body">
      <slot />
    </section>
    <footer class="modal-card-foot">
      <button
        class="button is-success"
        on:click={() => {
          onSave();
          close();
        }}
        disabled={onSaveDisabled}
      >
        Save
      </button>
      <button class="button" on:click={close}>Cancel</button>
    </footer>
  </div>
</div>
