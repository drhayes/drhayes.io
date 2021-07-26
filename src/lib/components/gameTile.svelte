<script lang="typescript">
  import prefersDark from '$stores/prefersDark';

  export let title;
  export let screenshotUrl;
  export let slug;

  $: headingColor = $prefersDark ? 'var(--heading-color)' : 'white';
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
    text-shadow: 0 0 5px rgba(255, 255, 255, .6);
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
    <h1 style="color: {headingColor}">{title}</h1>
  </section>
</a>
