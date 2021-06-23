<script>
  import RavenLogo from '$lib/components/ravenLogo.svelte';
  import SiteMenu from '$lib/components/siteMenu.svelte';
</script>

<style>
  .vertical-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* width: 100%; */
    max-width: 100%;
    height: 100vh;
  }

  .horizontal-center {
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  .logo {
    width: 240px;
    overflow: hidden;
  }

  h1 {
    font-size: 150%;
    font-weight: bold;
    line-height: 1.75;
  }

  .site-menu {
    margin-top: 2rem;
  }

  @media screen and (min-width: 720px) {
    .vertical-center {
      width: 60rem;
      margin-left: auto;
      margin-right: auto;
    }

    .horizontal-center {
      flex-direction: row;
      text-align: initial;
    }

    h1 {
      font-size: 300%;
    }

    h2 {
      font-size: 150%;
    }
  }
</style>

<svelte:head>
  <title>Hi there! - drhayes.io</title>
</svelte:head>

<section class="vertical-center">
  <div class="horizontal-center">
    <div class="logo">
      <RavenLogo />
    </div>
    <div class="greeting-text">
      <h1>Hi. 👋🏽</h1>
      <h2>My name is David Hayes.</h2>
      <h2><a href="mailto:hi@drhayes.io">hi@drhayes.io</a></h2>
      <h2>I do stuff with computers.</h2>
    </div>
  </div>
  <div class="horizontal-center site-menu">
    <SiteMenu />
  </div>
</section>
