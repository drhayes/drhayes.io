<script lang="ts">
  export let imageUrl;
  export let caption;
  export let alt;
</script>

<style>
  figcaption {
    width: 100%;
    font-size: 80%;
    text-align: center;
  }

  img {
    width: 100%;
  }
</style>

<figure>
  <img src="{imageUrl}" alt="{alt || caption}">
  {#if caption}
    <figcaption>{caption}</figcaption>
  {/if}
</figure>
