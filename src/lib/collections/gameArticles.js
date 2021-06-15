function gameArticles(collectionApi) {
  return collectionApi
    .getFilteredByGlob('src/games/**/*.md')
    .filter((page) => !page.inputPath.includes('index.md'));
}

module.exports = gameArticles;
