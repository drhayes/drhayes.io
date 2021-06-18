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

  article {
    margin-top: 0;
  }

  article :global(p:first-of-type:first-letter) {
    font-family: monospace;
    font-size: 300%;
    font-weight: bold;
    padding: .6rem .9rem;
    margin-right: .5rem;
    border: 1px dotted var(--light-border-color);
    float: left;
  }

  article :global(blockquote) :global(p:first-of-type:first-letter) {
    font-size: inherit;
    font-weight: inherit;
    padding: inherit;
    margin-right: inherit;
    border: none;
    float: none;
  }

  :global(article>figure) :global(blockquote+figcaption) {
    background-color: var(--blockquote-backgroud-color);
    font-size: 120%;
    font-style: italic;
    border-style: none;
    border-left-style: solid;
    border-width: 0.5rem;
    border-color: var(--blockquote-border-color);
    text-align: right;
  }

  :global(article>figure) :global(blockquote+figcaption::before) {
    content: '– ';
  }
</style>

<script lang="typescript">
  import RavenLogo from '$lib/components/ravenLogo.svelte';
  import SiteMenu from '$lib/components/siteMenu.svelte';
  import TitleElement from '$lib/components/titleElement.svelte';
  import ArticleDate from '$lib/components/articleDate.svelte';
  import TagsList from '$lib/components/tagsList.svelte';

  export let title;
  export let description;
  export let date;
  export let updated;
  export let tags;
</script>

<svelte:head>
  <title>{title} · drhayes.io</title>
  {#if description}
    <meta name="description" content="{description}">
  {/if}
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
    <TagsList tags={tags} />
  </header>
  <article>
    <slot></slot>
  </article>
</main>
