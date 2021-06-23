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
    padding: 2rem 5rem 2rem 5rem;
    background-size: cover;
  }

  h1 {
    font-size: 175%;
    padding: 0;
    margin: 0;
    text-align: center;
  }

  @media screen and (min-width: 720px) {
    section {
      padding: 5rem;
    }

    h1 {
      font-size: 200%;
    }
  }
</style>

<a href="/games/{slug}">
  <section style="background-image: url({screenshotUrl})">
    <h1>{title}</h1>
  </section>
</a>
