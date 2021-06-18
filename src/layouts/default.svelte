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
  import ArticleDate from '$lib/components/articleDate.svelte';
  import SiteFooter from '$lib/components/siteFooter.svelte';

  export let title;
  export let description;
  export let date;
  export let updated;
</script>

<svelte:head>
  <title>{title} · drhayes.io</title>
  <meta name="description" content="{description}">
</svelte:head>

<main>
  <header>
    <nav>
      <a href="/" class="site-link">
        <RavenLogo />
      </a>
      <SiteMenu />
    </nav>
    <TitleElement title={title} />
    <ArticleDate created={date} updated={updated} />
  </header>
  <article>
    <slot></slot>
  </article>
</main>
<SiteFooter />
