function links(collectionApi) {
  return collectionApi.getFilteredByGlob('src/links/**/*.md');
}

module.exports = links;

