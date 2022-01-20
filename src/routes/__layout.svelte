<script context="module" lang="ts">
  export async function load({ page: { host, path } }) {
    return {
      props: {
        host,
        path,
      }
    };
  }
</script>

<script lang="ts">
  export let host;
  export let path;
</script>

<svelte:head>
  <link rel="alternate" type="application/rss+xml" href="https://{host}/feed.xml">
  <link rel="canonical" href="https://{host}{path}">
  <base href="///{host}/">
</svelte:head>

<slot></slot>

