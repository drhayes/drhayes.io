<script lang="ts">
  import prefersDark from '$stores/prefersDark';
  import { browser } from '$app/env';

  $: {
    if (browser) {
      const classList = document.querySelector('html').classList;
      if ($prefersDark) {
        classList.remove('light');
        classList.add('dark');
      } else {
        classList.remove('dark');
        classList.add('light');
      }
    }
  }
</script>
