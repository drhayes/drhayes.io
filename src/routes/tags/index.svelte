<script context="module" lang="typescript">
  export async function load({ fetch }) {
    const posts = await fetch('/blog.json').then(res => res.json());
    const tags = posts.reduce((all, post) => {
      if (post.tags) {
        post.tags.forEach(tag => all.add(tag));
      }
      return all;
    }, new Set());

    return {
      props: {
        tags: [...tags].sort(),
      }
    };
  }
</script>

<script lang="typescript">
  import DefaultLayout from '../../layouts/default.svelte';
  export let tags;
</script>

<style>
  ol {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  li {
  }
</style>

<DefaultLayout title="Tags">
  <ol>
    {#each tags as tag}
      <li>
        <a href="/tags/{tag}">#{tag}</a>
      </li>
    {/each}
  </ol>
</DefaultLayout>
