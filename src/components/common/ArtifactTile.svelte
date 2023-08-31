<script lang="ts">
  import type { Artifact } from '@ionio-lang/ionio';

  export let artifact: Artifact;
  export let description: string;
  export let onClick: () => void;

  $: numberOfInputs = artifact.constructorInputs.length;
  $: numberOfFunctions = artifact.functions.length;
  $: functionsString = numberOfFunctions === 1 ? 'branch' : 'branches';
</script>

<div class="box primary-hover">
  <div class="card-content">
    <button
      class="button is-small is-rounded is-primary is-outlined is-pulled-right"
      on:click={onClick}
    >
      <span class="icon">
        <i class="fas fa-arrow-right" />
      </span>
      <span>View</span>
    </button>
    <div class="media">
      <div class="media-left">
        <figure class="image is-48x48">
          <img
            src="https://bulma.io/images/placeholders/96x96.png"
            alt="artifact logo"
          />
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-4">{artifact.contractName}</p>
        <p class="subtitle is-6">
          {numberOfInputs} constructor inputs, {numberOfFunctions}
          {functionsString}
        </p>
      </div>
    </div>

    <p class="mt-3 is-size-8 is-italic">
      {description}
    </p>
  </div>
</div>
