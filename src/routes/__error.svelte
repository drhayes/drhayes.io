<script context="module" lang="typescript">
  export function load({ error, status }) {
    return {
      props: {
        title: `${status}: ${error.message}`,
      }
    }
  }
</script>

<script>
  import DefaultLayout from '../layouts/default.svelte';
  export let title;
</script>

<DefaultLayout title={title}>
  <p>The sadness!</p>
  <p>You should try some other site content like:</p>
  <ul>
    <li>
      <a href="/about">The about page.</a>
    </li>
    <li>
      <a href="/games">The games page.</a>
    </li>
  </ul>
</DefaultLayout>
