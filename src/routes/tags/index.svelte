<script context="module" lang="ts">
  export async function load({ fetch }) {
    const tags = await fetch('/tags.json').then(res => res.json());
    return {
      props: {
        tags: tags.sort(),
      }
    };
  }
</script>

<script lang="ts">
  import DefaultLayout from '../../layouts/default.svelte';
  export let tags;
</script>

<style>
  ol {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  ol li::before {
    content: '';
  }

  p {
    margin-bottom: 1em;
  }
</style>

<DefaultLayout title="Tags">
  <p>Because you really wanted to see all the tags...</p>
  <ol>
    {#each tags as tag}
      <li>
        <a href="/tags/{tag}">#{tag}</a>
      </li>
    {/each}
  </ol>
</DefaultLayout>
