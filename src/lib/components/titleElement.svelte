<script lang="typescript">
  export let title: string;
</script>

<style>
  h1 {
    position: relative;
    border-bottom: 3px dotted #ccc;
    margin-top: 0;
    margin-bottom: .5em;
    padding-bottom: .2em;
    font-size: 200%;
    font-weight: bold;
    line-height: 1.4;
  }

  h1:after {
    display: block;
    content: '';
    width: 100%;
    position: absolute;
    bottom: 3px;
    border-bottom: 3px dotted #ccc;
  }
</style>

<h1>{title}</h1>
