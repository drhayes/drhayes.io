<style>
  a, a:visited {
    display: inline-block;
    margin-right: 0.3em;
    color: var(--subtext-content-color);
  }

  a:hover {
    color: var(--text-content-color);
  }

  svg {
    margin-left: 1em;
    margin-right: 0.2em;
  }

  svg path {
    fill: var(--subtext-content-color);
    stroke: var(--subtext-content-color);
  }
</style>

<script lang="typescript">
  export let tags;
</script>

{#if tags}
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M2.5 7.775V2.75a.25.25 0 01.25-.25h5.025a.25.25 0 01.177.073l6.25 6.25a.25.25 0 010 .354l-5.025 5.025a.25.25 0 01-.354 0l-6.25-6.25a.25.25 0 01-.073-.177zm-1.5 0V2.75C1 1.784 1.784 1 2.75 1h5.025c.464 0 .91.184 1.238.513l6.25 6.25a1.75 1.75 0 010 2.474l-5.026 5.026a1.75 1.75 0 01-2.474 0l-6.25-6.25A1.75 1.75 0 011 7.775zM6 5a1 1 0 100 2 1 1 0 000-2z"></path></svg>
  {#each tags as tag}
    <a href="/tags/{tag}">#{tag}</a>
  {/each}
{/if}
