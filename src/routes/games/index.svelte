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

<DefaultLayout title="Games">
  {#each games as game}
    <GameTile title={game.title} slug={game.slug} screenshotUrl={game.screenshot} />
  {/each}

</DefaultLayout>
