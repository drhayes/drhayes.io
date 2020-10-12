// Sort alphabetically.
const noteSorter = (a, b) => {
  const titleA = a.data.title.toUpperCase();
  const titleB = b.data.title.toUpperCase();
  if (titleA < titleB) {
    return - 1;
  } else if (titleA > titleB) {
    return 1;
  } else {
    return 0;
  }
}

function notes(collectionApi) {
  return collectionApi
    .getAll()
    .filter((page) => page.inputPath.includes('notes/'))
    .filter((page) => !page.inputPath.includes('index.md'))
    .sort(noteSorter);
}

module.exports = notes;
