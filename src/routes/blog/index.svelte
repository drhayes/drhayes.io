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
    margin-bottom: 2rem;
  }

  li > * {
    margin-bottom: 0.2em;
  }

  .date {
    order: 1;
    width: var(--first-column-width);
    vertical-align: text-bottom;
    line-height: 2;
  }

  .title {
    font-size: 1.5em;
    line-height: 1.2;
    order: 2;
    width: calc(100% - var(--first-column-width));
    margin-top: 0;
  }

  .description {
    margin-top: 0;
    order: 3;
    margin-left: var(--first-column-width);
  }

  .tags {
    order: 4;
    margin-left: var(--first-column-width);
  }
</style>

<DefaultLayout title="Blog">
  <ol>
    {#each posts as post}
      <li>
        <h1 class="title">
          <a href="/blog/{post.slug}">{post.title}</a>
        </h1>
        <div class="date">
          <FormattedDate dateString={post.date} />
        </div>
        {#if post.description}
          <p class="description">{post.description}</p>
        {/if}
        <div class="tags">
          <TagsList tags={post.tags} />
        </div>
      </li>
    {/each}
  </ol>
</DefaultLayout>

