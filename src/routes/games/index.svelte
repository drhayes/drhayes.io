<script context="module" lang="typescript">
  export async function load({ fetch }) {
    const games = await fetch('/games.json').then(res => res.json());

    return {
      props: {
        games,
      }
    };
  }
</script>

<script lang="typescript">
  import DefaultLayout from '../../layouts/default.svelte';
  import GameTile from '$lib/components/gameTile.svelte';
  export let games;
</script>

<style>
  ol {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  li {
    border: 1px dotted var(--light-border-color);
    margin-bottom: 1rem;
  }
</style>

<DefaultLayout title="Games">
  <ol>
  {#each games as game}
    <li>
      <GameTile title={game.title} slug={game.slug} screenshotUrl={game.screenshot} />
    </li>
  {/each}
  </ol>
</DefaultLayout>
