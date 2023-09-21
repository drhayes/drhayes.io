function quotes(collectionApi) {
  return collectionApi.getFilteredByGlob('src/quotes/**/*.md');
}

module.exports = quotes;
