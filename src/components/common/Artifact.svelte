<script lang="ts">
  import type { Artifact } from '@ionio-lang/ionio';
  import ArtifactFunction from './ArtifactFunction.svelte';

  export let artifact: Artifact;
</script>

<div>
  <p class="title is-size-4">{artifact.contractName}</p>
  <div class="columns mt-4">
    <div class="column is-narrow">
      <p class="subtitle is-size-6">
        Constructor inputs
      </p>
      <div class="table-container">
        <table class="table is-striped">
          <thead>
            <tr>
              <th class="is-size-7">Name</th>
              <th class="is-size-7">Type</th>
            </tr>
          </thead>
          <tbody>
            {#each artifact.constructorInputs as input}
              <tr>
                <td class="is-size-7">{input.name}</td>
                <td class="is-size-7">{input.type}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>

    <div class="column">
      <p class="subtitle is-size-6">
        Covenant branches
      </p>
      {#each artifact.functions as fn}
        <ArtifactFunction {fn} />
      {/each}
    </div>
  </div>
</div>
