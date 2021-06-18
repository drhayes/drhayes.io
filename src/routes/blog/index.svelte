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
  import FormattedDate from '$lib/components/formattedDate.svelte';
  import TagsList from '$lib/components/tagsList.svelte';
  export let posts;
</script>

<style>
  ol {
    list-style-type: none;
    margin: 0;
    padding: 0;

    --first-column-width: 20%;
  }

  li {
    display: flex;
    flex-wrap: wrap;
    /* margin-bottom: 2rem; */
  }

  li > * {
    margin-bottom: 0.3em;
  }

  .date {
    order: 1;
    width: var(--first-column-width);
  }

  .title {
    display: inline-block;
    order: 2;
  }

</style>

<DefaultLayout title="Blog">
  <ol>
    {#each posts as post}
      <li>
        <a href="/blog/{post.slug}" class="title" title={post.description}>{post.title}</a>
        <div class="date">
          <FormattedDate dateString={post.date} />
        </div>
      </li>
    {/each}
  </ol>
</DefaultLayout>

