<style>
  button {
    border: 0;
    color: var(--text-content-color);
    background-color: transparent;
    cursor: pointer;
  }
</style>

<script lang="typescript">
  import SunIcon from './icons/sun.svelte';
  import MoonIcon from './icons/moon.svelte';
  import userPreferences from '$stores/userPreferences';
</script>

<button on:click="{() => userPreferences.toggleDarkMode()}">
  {#if $userPreferences.isDarkMode}
    <MoonIcon />
  {:else}
    <SunIcon />
  {/if}
</button>
