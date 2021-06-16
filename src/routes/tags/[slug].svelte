<script context="module" lang="typescript">
  export async function load({ fetch, page: { params } }) {
    const posts = await fetch('/blog.json').then(res => res.json());
    const { slug } = params;
    const postsByTag = posts.filter(post => post.tags?.includes(slug));

    return {
      props: {
        title: `#${slug}`,
        tag: slug,
        postsByTag,
      }
    };
  }
</script>

<script lang="typescript">
  import DefaultLayout from '../../layouts/default.svelte';
  import TagsList from '$lib/components/tagsList.svelte';
  export let tag;
  export let postsByTag;
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
    {#each postsByTag as post}
      <li>
        <h1>
          <a href="/blog/{post.slug}">{post.title}</a>
        </h1>
        {#if post.description}
          <p class="description">{post.description}</p>
        {/if}
        <TagsList tags={post.tags} />
      </li>
    {/each}
  </ol>
</DefaultLayout>
