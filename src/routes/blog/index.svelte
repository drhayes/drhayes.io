<style>
  main {
    width: var(--content-width);
    margin-left: auto;
    margin-right: auto;
  }

  .site-link {
    display: inline-block;
    width: 30%;
  }

  nav {
    margin-bottom: 1rem;
  }

  header {
    margin-bottom: 2rem;
  }
</style>

<script lang="typescript">
  import RavenLogo from '$lib/components/ravenLogo.svelte';
  import SiteMenu from '$lib/components/siteMenu.svelte';
  import TitleElement from '$lib/components/titleElement.svelte';
</script>

<svelte:head>
  <title>Blog · drhayes.io</title>
  <meta name="description" content="Blog stuff, yo.">
</svelte:head>

<main>
  <header>
    <nav>
      <a href="/" class="site-link">
        <RavenLogo />
      </a>
      <SiteMenu />
    </nav>
    <TitleElement title="Blog" />
  </header>
  <ol>
    <li>Blog post here</li>
  </ol>
</main>
