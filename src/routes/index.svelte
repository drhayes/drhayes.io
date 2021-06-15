<script>
  import RavenLogo from '$lib/ravenLogo.svelte';
  import SiteMenu from '$lib/siteMenu.svelte';
</script>

<style>
  .verticalCenter {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 60rem;
    height: 100vh;
    margin-left: auto;
    margin-right: auto;
  }

  .horizontalCenter {
    display: flex;
  }

  .left {
    width: 30ch;
  }

  h1 {
    font-size: 300%;
    font-weight: bold;
  }

  h2 {
    font-size: 150%;
  }
</style>

<section class="verticalCenter">
  <div class="horizontalCenter">
    <div class="left">
      <RavenLogo />
    </div>
    <div class="right">
      <h1>Hi. 👋🏽</h1>
      <h2>My name is David Hayes.</h2>
      <h2><a href="mailto:hi@drhayes.io">hi@drhayes.io</a></h2>
      <h2>I do stuff with computers.</h2>
    </div>
  </div>
  <div class="horizontalCenter">
    <SiteMenu />
  </div>
</section>
