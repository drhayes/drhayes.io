<script lang="typescript">
  // import SunIcon from './icons/sun.svelte';
  // import MoonIcon from './icons/moon.svelte';
  import userPreferences from '$stores/userPreferences';
</script>

<button on:click="{() => userPreferences.toggleDarkMode()}">Toggle</button>
