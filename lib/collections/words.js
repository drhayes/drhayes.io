function words(collectionApi) {
  return collectionApi.getFilteredByGlob('src/words/**/*.md');
}

module.exports = words;

