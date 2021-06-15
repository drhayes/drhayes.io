// Sort alphabetically.
const quoteSorter = (a, b) => {
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

function quotes(collectionApi) {
  return collectionApi
    .getAll()
    .filter((page) => page.inputPath.includes('quotes/'))
    .filter((page) => !page.inputPath.includes('index.md'))
    .sort(quoteSorter);
}

module.exports = quotes;
