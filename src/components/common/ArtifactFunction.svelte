<script lang="ts">
  import type { ArtifactFunction } from '@ionio-lang/ionio';
  import classNames from 'classnames';

  export let fn: ArtifactFunction;

  let isOpen = false;
</script>

<div class="card primary-hover mt-1 mb-1">
  <header
    class={classNames('card-header', {
      'has-background-primary-light': isOpen,
    })}
    on:click={() => (isOpen = !isOpen)}
    on:keydown
  >
    <p class="card-header-title">{fn.name}</p>
    <button
      on:click={() => (isOpen = !isOpen)}
      class="card-header-icon"
      aria-label="more options"
    >
      <span class="icon">
        <i
          class={classNames('fa', {
            'fa-angle-down': !isOpen,
            'fa-angle-up': isOpen,
          })}
          aria-hidden="true"
        />
      </span>
    </button>
  </header>

  {#if isOpen}
    <div class="card-content">
      <div class="columns">
        <div class="column is-narrow">
          <p class="subtitle is-size-6">
            Input stack
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
                {#each fn.functionInputs as input}
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
            Requirements
          </p>
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
                    <td class="is-size-7"
                      >{JSON.stringify(requirement.expected)}</td
                    >
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <p class="subtitle is-size-6">
        Script
      </p>
      <blockquote class="is-family-code is-size-7">
        {fn.asm.join(' ')}
      </blockquote>
    </div>
  {/if}
</div>
