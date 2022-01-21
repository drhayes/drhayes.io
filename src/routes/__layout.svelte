<script context="module" lang="ts">
  export async function load({ url: { hostname, pathname }, }) {
    return {
      props: {
        hostname,
        pathname,
      }
    };
  }
</script>

<script lang="ts">
  export let hostname: string;
  export let pathname: string;
</script>

<svelte:head>
  <link rel="alternate" type="application/rss+xml" href="https://{hostname}/feed.xml">
  <link rel="canonical" href="https://{hostname}{pathname}">
</svelte:head>

<slot></slot>

