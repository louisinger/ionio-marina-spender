
<script>
  import { Page, goto, navigationStore } from "../stores/navigation.store";

  function handleReceiveClick() {
    navigationStore.update(goto(Page.Receive));
  }

  function handleSendClick() {
    navigationStore.update(goto(Page.Send));
  }
</script>

<style>
  /* You can add custom styles here if needed */
</style>

<div class="hero is-fullheight">
  <div class="hero-body">
    <div class="container has-text-centered">
      <p class="title is-2">Welcome to Ionio</p>
      <p class="subtitle is-4">Craft custom <a href="https://liquid.net">Liquid</a> tapscripts and spend them using Marina, powered by <a href="https://ionio-lang.org/">Ionio</a>.</p>
      <div class="buttons is-centered">
        <button class="button is-success is-large" on:click={handleReceiveClick}>RECEIVE</button>
        <button class="button is-info is-large" on:click={handleSendClick}>SEND</button>
      </div>
    </div>
  </div>
</div>