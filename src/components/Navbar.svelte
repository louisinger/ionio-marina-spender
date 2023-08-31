<script>
  import { Page, goto, navigationStore } from '../stores/navigation.store';
  import MarinaButton from './common/MarinaButton.svelte';
</script>

<nav class="navbar" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" target="_blank" href="https://ionio-lang.org/">
      <img
        alt="logo"
        src="https://ionio-lang.org/img/logo.svg"
        width="112"
        height="32"
      />
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <!-- svelte-ignore a11y-invalid-attribute -->
      <a
        on:click={() => navigationStore.update(goto(Page.Home))}
        href="#"
        class="navbar-item"
      >
        Home
      </a>

      <a
        target="_blank"
        href="https://ionio-lang.org/docs/intro"
        class="navbar-item"
      >
        Learn
      </a>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <MarinaButton />
        </div>
      </div>
    </div>
  </div>
</nav>
