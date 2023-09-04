function notes(collectionApi) {
  const notesList = collectionApi.getFilteredByGlob('src/notes/**/*.md');

  return notesList;
}

module.exports = notes;
