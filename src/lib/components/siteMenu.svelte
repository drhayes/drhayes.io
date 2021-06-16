<script>
  const menuItems = [
    { "name": "Now", "url": "/now" },
    { "name": "Lately", "url": "/lately" },
    { "name": "Notes", "url": "https://notes.drhayes.io" },
    { "name": "Blog", "url": "/blog" },
    { "name": "Games", "url": "/games" },
    { "name": "About", "url": "/about" }
  ];
</script>

<style>
  ol {
    display: flex;
    margin: 0;
  }

  li {
    list-style-type: none;
    margin-right: 1rem;
  }
</style>

<ol>
  {#each menuItems as item}
    <li>
      <a href="{item.url}">{item.name}</a>
    </li>
  {/each}
</ol>
