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
    margin: 0;
  }

  li {
    margin: 0;
    margin-bottom: .5rem;
    list-style-type: none;
  }

  @media screen and (min-width: 720px) {
    ol {
      display: flex;
    }

    li {
      margin: 0;
      margin-right: 1rem;
    }
  }
</style>

<ol>
  {#each menuItems as item}
    <li class:tierTwo="{item.tierTwo}">
      <a href="{item.url}">{item.name}</a>
    </li>
  {/each}
</ol>
