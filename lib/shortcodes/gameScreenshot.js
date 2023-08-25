function gameScreenshot(screenshotUrl, caption, alt) {
  return `<figure class="stack">
  <img src="${screenshotUrl}" alt="${alt || caption}">
  <figcaption>${caption}</figcaption>
</figure>`;
}

module.exports = gameScreenshot;
