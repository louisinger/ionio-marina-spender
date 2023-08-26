<script>
  import { Page, goto, navigationStore } from '../stores/navigation.store';
</script>

<nav class="navbar" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://ionio-lang.org/">
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

      <a href="https://ionio-lang.org/docs/intro" class="navbar-item">
        Learn
      </a>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a
            href="https://github.com/louisinger/ionio-marina-spender"
            class="button is-rounded is-primary"
          >
            <span class="icon is-small">
              <i class="fas fa-brands fa-github" />
            </span>
        </a>
        </div>
      </div>
    </div>
  </div>
</nav>
