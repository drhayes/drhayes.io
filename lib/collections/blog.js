function blog(collectionApi) {
  return collectionApi.getFilteredByGlob('src/blog/**/*.md');
}

module.exports = blog;
