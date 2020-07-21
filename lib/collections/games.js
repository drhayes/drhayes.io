function games(collectionApi) {
  return collectionApi.getFilteredByGlob('src/games/**/index.md').reverse();
}

module.exports = games;
