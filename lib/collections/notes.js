function notes(collectionApi) {
  return collectionApi
    .getAll()
    .filter((page) => page.inputPath.includes('notes/'))
    .filter((page) => !page.inputPath.includes('index.md'));
}

module.exports = notes;
