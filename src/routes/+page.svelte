<script lang="ts">
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
</script>

<h1>Packs</h1>

{#if data}
  <ul>
    {#each data.packs as pack}
      <li>{pack.name}</li>
    {/each}
  </ul>
{/if}
