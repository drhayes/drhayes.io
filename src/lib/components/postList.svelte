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

<script lang="typescript">
  import FormattedDate from '$lib/components/formattedDate.svelte';
  export let posts;
</script>

<ol>
  {#each posts as post}
    <li>
      <a href="{post.slug}" class="title" title={post.description}>{post.title}</a>
      <div class="date">
        <FormattedDate dateString={post.date} />
      </div>
    </li>
  {/each}
</ol>
