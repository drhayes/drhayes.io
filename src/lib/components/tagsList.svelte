<style>
  ul {
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  li {
    margin-right: 1em;
  }
</style>

<script lang="typescript">
  export let tags;
</script>

{#if tags}
  <ul>
    {#each tags as tag}
      <li>
        <a href="/tags/{tag}">#{tag}</a>
      </li>
    {/each}
  </ul>
{/if}
