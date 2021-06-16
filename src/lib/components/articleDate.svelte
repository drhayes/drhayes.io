<script lang="typescript">
  import FormattedDate from './formattedDate.svelte';
  export let created;
  export let updated;
</script>

{#if created}
  <FormattedDate dateString={created} />
{/if}
{#if updated}
  <FormattedDate dateString={updated}>
    <span slot="prefix">(Updated&nbsp;</span>
    <span slot="suffix">)</span>
  </FormattedDate>
{/if}
