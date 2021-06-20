<script lang="typescript">
  export let title;
  export let screenshotUrl;
  export let slug;
</script>

<style>
  a {
    color: var(--text-content-color);
    text-shadow: 0 0 10px #000;
    text-decoration: none;
  }

  section {
    padding: 5rem;
    background-size: cover;
  }

  h1 {
    font-size: 200%;
    padding: 0;
    margin: 0;
    text-align: center;
  }
</style>

<a href="/games/{slug}">
  <section style="background-image: url({screenshotUrl})">
    <h1>{title}</h1>
  </section>
</a>
