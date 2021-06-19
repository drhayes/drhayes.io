
<script context="module" lang="typescript">
  import type { Metadata } from '$lib/metadataUtil';
  import allPages from '$lib/allPages';

  export async function load({ page: { params } }) {
    const metadata = await allPages();
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
  import PostList from '$lib/components/postList.svelte';

  export let tag;
  export let metadataByTag: Metadata[];
</script>

<DefaultLayout title="#{tag}">
  <PostList posts={metadataByTag} />
</DefaultLayout>
