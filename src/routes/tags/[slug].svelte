
<script context="module" lang="typescript">
  import type { Metadata } from '$lib/metadataUtil';
  export async function load({ page: { params } }) {
    const pageFiles = import.meta.glob('/src/routes/**/*.md');
    const metadataPromises = [];
    for (const [slug, resolver] of Object.entries(pageFiles)) {
      metadataPromises.push(resolver().then(({ metadata }) => ({
        slug,
        ...metadata,
      })));
    }
    const metadata = await Promise.all(metadataPromises);
    const { slug: tag } = params as Metadata;
    const metadataByTag = metadata
      .filter(metadata => metadata.tags?.includes(tag))
      .map(metadata => {
        metadata.slug = metadata.slug
          .replace('/src/routes', '')
          .replace('/index.md', '')
          .replace('.md', '');
        return metadata;
      });

    console.log(metadataByTag);

    return {
      props: {
        title: `#${tag}`,
        tag,
        metadataByTag,
      }
    };
  }
</script>

<script lang="typescript">
  import DefaultLayout from '../../layouts/default.svelte';
  import ArticleDate from '$lib/components/articleDate.svelte';
  import TagsList from '$lib/components/tagsList.svelte';
  import { dateSortDescending } from '$lib/metadataUtil';

  export let tag;
  export let metadataByTag: Metadata[];

  metadataByTag.sort(dateSortDescending);
</script>

<style>
  ol {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  li {
    margin-bottom: 2rem;
  }

  h1 {
    font-size: 150%;
  }

  p {
    margin: 0;
  }
</style>

<DefaultLayout title="#{tag}">
  <ol>
    {#each metadataByTag as metadata}
      <li>
        <h1>
          <a href={metadata.slug}>{metadata.title}</a>
        </h1>
        <ArticleDate created={metadata.date} updated={metadata.updated} />
        {#if metadata.description}
          <p class="description">{metadata.description}</p>
        {/if}
        <TagsList tags={metadata.tags} />
      </li>
    {/each}
  </ol>
</DefaultLayout>
