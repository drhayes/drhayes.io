function gameScreenshot(screenshotUrl, caption, alt) {
  return `<figure class="game-screenshot">
  <img src="${screenshotUrl}" alt="${alt || caption}">
  <figcaption>${caption}</figcaption>
</figure>`;
}

module.exports = gameScreenshot;

