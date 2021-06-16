<script lang="typescript">
  import FormattedDate from './formattedDate.svelte';
  export let updated;
</script>

{#if updated}
  <FormattedDate dateString={updated} />
{/if}
