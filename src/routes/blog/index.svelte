<script context="module" lang="typescript">
  export async function load({ fetch }) {
    const posts = await fetch('/blog.json').then(res => res.json());

    return {
      props: {
        posts,
      }
    };
  }
</script>

<script lang="typescript">
  import DefaultLayout from '../../layouts/default.svelte';
  import PostList from '$lib/components/postList.svelte';
  export let posts;
</script>

<DefaultLayout title="Blog">
  <PostList posts={posts} />
</DefaultLayout>

