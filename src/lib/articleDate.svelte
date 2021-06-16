<script lang="typescript">
  import { format } from 'date-fns';
  export let updated;

  const updatedDate = Date.parse(updated);

  const updatedIso = format(updatedDate, `yyyy-MM-dd'T'HH:mm:ss.SSSxxx`)
  const updatedHuman = format(updatedDate, 'y.LL.dd');
</script>

<style>
  time {
    opacity: 0.6;
  }
</style>

<time datetime="{updatedIso}">
  (Updated {updatedHuman})
</time>
