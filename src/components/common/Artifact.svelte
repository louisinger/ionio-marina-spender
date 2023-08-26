<script lang="ts">
  import type { Artifact } from '@ionio-lang/ionio';
  import ArtifactFunction from './ArtifactFunction.svelte';

  export let artifact: Artifact;
</script>

<div>
  <p class="title is-size-5">{artifact.contractName}</p>

  <p class="subtitle is-size-7">Constructor inputs</p>
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
  
  <p class="subtitle is-size-7">Constructor inputs</p>
  {#each artifact.functions as fn}
    <ArtifactFunction fn={fn} />
  {/each}
</div>
