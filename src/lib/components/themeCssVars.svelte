<script lang="typescript">
  import userPreferences from '$stores/userPreferences';

  const darkModeVars = `
  --text-content-color: rgb(255, 255, 255);
  --subtext-content-color: rgba(255, 255, 255, 0.6);
  --background-color: #111;
  --heading-color: rgb(250, 250, 116);
  --link-color-normal: rgba(250, 250, 116, 1);
  --link-color-hover: rgba(250, 250, 116, 1);
  --light-border-color: rgba(255, 255, 255, .2);
  --blockquote-border-color: #4682b4b8;
  --blockquote-background-color: #223;`;

  const lightModeVars = `
  --text-content-color: rgb(16, 16, 16);
  --subtext-content-color: rgba(0, 0, 0, 0.8);
  --background-color: rgb(255, 255, 255);
  --heading-color: rgb(132, 0, 0);
  --link-color-normal: rgba(96, 165, 221, 1);
  --link-color-hover: rgba(96, 165, 221, 1);
  --light-border-color: rgba(255, 255, 255, .2);
  --blockquote-border-color: #4682b4b8;
  --blockquote-background-color: #f9f9ff;`;

  $: styleVars = $userPreferences.isDarkMode ? darkModeVars : lightModeVars;

  function setCssVars(node, styleVars) {
    node.textContent = `:root { ${styleVars} }`;

    return {
      update(styleVars) {
        console.log(styleVars);
        node.textContent = `:root { ${styleVars} }`;
      },
      destroy() {},
    };
  }
</script>

<svelte:head>
  <style type="text/css" use:setCssVars={styleVars} />
</svelte:head>
