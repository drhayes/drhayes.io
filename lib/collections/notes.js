function notes(collectionApi) {
  return collectionApi.getFilteredByGlob('src/notes/**/*.md');
}

module.exports = notes;
