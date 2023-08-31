<script>
  import Artifacts from './Artifacts.svelte';
</script>

<div>
  <div class="container mb-2">
    <p class="title is-2">Welcome to Ionio explorer</p>
    <p class="subtitle is-6 mb-5">
      <a href="https://ionio-lang.org/">Ionio</a> is a Liquid smart contract
      language providing JSON file named Artifact describing the taproot
      structure of the locking script.
      <br />
      Connect your Marina wallet (top-right corner) to inspect your coins and their
      artifacts.
    </p>
  </div>

  <Artifacts />
</div>
