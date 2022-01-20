<style>
  button {
    border: 0;
    color: var(--text-content-color);
    background-color: transparent;
    cursor: pointer;
  }
</style>

<script lang="ts">
  import SunIcon from './icons/sun.svelte';
  import MoonIcon from './icons/moon.svelte';
  import prefersDark from '$stores/prefersDark';
</script>

<button on:click="{() => prefersDark.toggleDarkMode()}">
  {#if $prefersDark}
    <MoonIcon />
  {:else}
    <SunIcon />
  {/if}
</button>
