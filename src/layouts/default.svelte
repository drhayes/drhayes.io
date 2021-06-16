<style>
  article {
    width: 80ch;
    margin-left: auto;
    margin-right: auto;
  }

  .siteLink {
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
  import ArticleTitle from '$lib/components/articleTitle.svelte';
  import ArticleDate from '$lib/components/articleDate.svelte';

  export let title;
  export let description;
  export let updated;
</script>

<svelte:head>
  <title>{title} · drhayes.io</title>
  <meta name="description" content="{description}">
</svelte:head>

<article>
  <header>
    <nav>
      <a href="/" class="siteLink">
        <RavenLogo />
      </a>
      <SiteMenu />
    </nav>
    <ArticleTitle title={title} />
    <ArticleDate updated={updated} />
  </header>
  <slot></slot>
</article>
