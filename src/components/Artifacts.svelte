<script lang="ts">
  import classNames from 'classnames';
  import Artifact from './common/Artifact.svelte';
  import ArtifactTile from './common/ArtifactTile.svelte';
  import { isArtifact } from '../application/guard';
  import { featuredArtifacts } from '../application/featuredArtifacts';

  const fetchArtifact = async (url: string) => {
    const res = await fetch(url);
    const artifact = await res.json();
    if (isArtifact(artifact)) {
      return artifact;
    }

    throw new Error('Invalid artifact');
  };

  let selected = undefined;

  let downloadArtifactState = {
    loading: false,
    error: undefined,
    artifact: undefined,
  };

  $: isSuccessInput = downloadArtifactState.artifact !== undefined;
  $: isErrorInput = downloadArtifactState.error !== undefined;
  $: isLoadingInput = downloadArtifactState.loading;

  let artifactUrl = '';

  const onInputChange = async () => {
    if (isLoadingInput || !artifactUrl) {
      return;
    }
    try {
      downloadArtifactState.error = undefined;
      downloadArtifactState.loading = true;
      downloadArtifactState.artifact = await fetchArtifact(artifactUrl);
    } catch (err) {
      downloadArtifactState.error = err.message;
      downloadArtifactState.artifact = undefined;
    } finally {
      downloadArtifactState.loading = false;
    }
  };
</script>

<div class="container">
  {#if selected !== undefined}
    <button
      class="button is-small is-rounded is-danger is-outlined is-pulled-right"
      on:click={() => (selected = undefined)}
    >
      <span class="icon">
        <i class="fas fa-arrow-left" />
      </span>
      <span>Back</span>
    </button>
    <Artifact artifact={selected} />
  {:else}
    <p class="title is-4">Featured Artifacts</p>
    <div class="columns is-multiline">
      {#each featuredArtifacts as { url, description }}
        {#await fetchArtifact(url)}
          <div class="column is-half box">
            <p class="title is-size-5">Loading...</p>
          </div>
        {:then artifact}
          <div class="column is-half">
            <ArtifactTile
              {artifact}
              {description}
              onClick={() => {
                selected = artifact;
              }}
            />
          </div>
        {/await}
      {/each}
    </div>
    <p class="title is-4">Download your artifact</p>
    <p class="subtitle is-6">
      Specify the URL where your Ionio artifact is located.
    </p>

    <div class="field is-text-center">
      <label for="artifact-url" class="label">Artifact URL</label>
      <div class="control">
        <input
          id="artifact-url"
          class={classNames('input is-rounded', {
            'is-success': isSuccessInput,
            'is-danger': isErrorInput,
            'is-loading': isLoadingInput,
          })}
          type="text"
          placeholder="https://raw.githubusercontent.com/louisinger/vault-calculator/master/src/calculator.json"
          bind:value={artifactUrl}
          on:input={onInputChange}
        />
        {#if isErrorInput}
          <p class="help is-danger has-text-centered">
            {downloadArtifactState.error}
          </p>
        {/if}

        {#if isSuccessInput}
          <p class="help is-success has-text-centered">Artifact found!</p>
          <ArtifactTile
            artifact={downloadArtifactState.artifact}
            description={'Your artifact dowloaded from ' + artifactUrl}
            onClick={() => {
              selected = downloadArtifactState.artifact;
            }}
          />
        {/if}
      </div>
    </div>
  {/if}
</div>
