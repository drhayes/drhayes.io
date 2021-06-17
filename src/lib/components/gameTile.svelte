<script lang="typescript">
  export let title;
  export let screenshotUrl;
  export let slug;
</script>

<style>
  section {
    padding: 5rem;
    margin: 0.5rem;
    background-size: cover;
  }

  h1 {
    font-size: 200%;
    padding: 0;
    margin: 0;
    text-align: center;
  }

  a {
    color: white;
    text-shadow: 0 0 10px #000;
    text-decoration: none;
  }
</style>

<a href="/games/{slug}">
  <section style="background-image: url({screenshotUrl})">
    <h1>{title}</h1>
  </section>
</a>
