<style>
  main {
    margin: 0 5px 0 5px;
    padding: 0;
  }

  .site-link {
    display: inline-block;
    width: 50%;
  }

  nav {
    display: flex;
    justify-content: space-around;
    margin-top: 1rem;
    margin-bottom: 1rem;
    text-align: center;
  }

  header {
    margin-bottom: 2rem;
  }

  @media screen and (min-width: 720px) {
    main {
      width: var(--content-width);
      margin-left: auto;
      margin-right: auto;
    }

    nav {
      display: block;
      text-align-last: left;
      margin-top: 0;
    }

    .site-link {
      width: 30%;
    }
  }
</style>

<script lang="typescript">
  import ThemeCssVars from '$lib/components/themeCssVars.svelte';
  import RavenLogo from '$lib/components/ravenLogo.svelte';
  import SiteMenu from '$lib/components/siteMenu.svelte';
  import TitleElement from '$lib/components/titleElement.svelte';
  import ArticleDate from '$lib/components/articleDate.svelte';
  import TagsList from '$lib/components/tagsList.svelte';
  import SiteFooter from '$lib/components/siteFooter.svelte';

  export let title;
  export let description;
  export let date;
  export let updated;
  export let tags;
</script>

<svelte:head>
  <title>{title} · drhayes.io</title>
  <meta name="description" content="{description}">
</svelte:head>

<ThemeCssVars />
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
    <TagsList tags={tags} />
  </header>
  <article>
    <slot></slot>
  </article>
</main>
<SiteFooter />
