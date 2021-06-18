<script context="module" lang="typescript">
  export async function load({ fetch }) {
    const pinboardPins = await fetch('/lately/pinboard.json').then(res => res.json());
    return {
      props: {
        pinboardPins,
      }
    };
  }
</script>

<script lang="typescript">
  import DefaultLayout from '../../layouts/default.svelte';
  export let pinboardPins;
</script>

<style>
  .pins {
  }

  li {
    /* margin-bottom: 1em; */
  }

  .link {
    margin: 0;
  }

  .tags {
    display: flex;
    margin-top: 0;
    margin-bottom: 0;
    list-style-type: none;
  }

  .tag {
    margin: 0;
    margin-right: 1em;
  }
</style>

<DefaultLayout title="Lately" description="What I've been up to around the web.">
  <h2>Pinboard</h2>
  <ul class="pins">
    {#each pinboardPins as pin}
      <li>
        <p class="link">
          <a href="{pin.href}">{pin.title}</a>
        </p>
        <ul class="tags">
          {#each pin.tags as tag}
            <li class="tag">
              <a href="https://pinboard.in/u:drhayes/t:{tag}">#{tag}</a>
            </li>
          {/each}
        </ul>
      </li>
    {/each}
  </ul>
</DefaultLayout>
