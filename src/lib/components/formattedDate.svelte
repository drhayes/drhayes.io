<script lang="typescript">
  import { format, parse } from 'date-fns';
  export let dateString;
  // The date strings come back in GMT, which is not where I'm writing any of this of course. So strike off the
  // fake timezone information that was tacked on by the frontmatter parser and format for realz.
  dateString = dateString.substr(0, dateString.indexOf('T'));
  const date = parse(dateString, 'yyyy-MM-dd', new Date());
  // Now format it as a datetime attribute and as a pretty human-readable date.
  const iso = format(date, `yyyy-MM-dd'T'HH:mm:ss.SSSxxx`)
  const human = format(date, 'y.LL.dd');
</script>

<style>
  time {
    opacity: 0.6;
  }
</style>

<time datetime="{iso}">
  <slot name="prefix"></slot>{human}<slot name="suffix"></slot>
</time>
