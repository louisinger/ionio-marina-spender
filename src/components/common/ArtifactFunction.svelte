<script lang="ts">
  import type { ArtifactFunction } from '@ionio-lang/ionio';

  export let fn: ArtifactFunction;

  let isOpen = false;
</script>

<div class="card">
  <header class="card-header">
    <p class="card-header-title">{fn.name}</p>
    <button on:click={() => isOpen = !isOpen} class="card-header-icon" aria-label="more options">
      <span class="icon">
        <i class="fas fa-angle-down" aria-hidden="true" />
      </span>
    </button>
  </header>

  {#if isOpen}
    <div class="card-content">
      <p class="subtitle is-size-7">Inputs stack</p>
      <div class="table-container">
        <table class="table is-striped">
          <thead>
            <tr>
              <th class="is-size-7">Name</th>
              <th class="is-size-7">Type</th>
            </tr>
          </thead>
          <tbody>
            {#each fn.functionInputs as input}
              <tr>
                <td class="is-size-7">{input.name}</td>
                <td class="is-size-7">{input.type}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>

      <p class="subtitle is-size-7">Requirements</p>
      <div class="table-container">
        <table class="table is-striped">
          <thead>
            <tr>
              <th class="is-size-7">Type</th>
              <th class="is-size-7">Require</th>
            </tr>
          </thead>
          <tbody>
            {#each fn.require as requirement}
              <tr>
                <td class="is-size-7"
                  >{requirement.type}
                  {requirement.atIndex !== undefined
                    ? '#' + requirement.atIndex
                    : ''}</td
                >
                <td class="is-size-7">{JSON.stringify(requirement.expected)}</td
                >
              </tr>
            {/each}
          </tbody>
        </table>
      </div>

      <p class="subtitle is-size-7">Inputs stack</p>
      <p class="is-family-code">{fn.asm.join(' ')}</p>
    </div>
  {/if}
</div>
