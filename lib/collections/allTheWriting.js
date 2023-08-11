function allTheWriting(collectionApi) {
  const blogList = collectionApi.getFilteredByGlob('src/blog/**/*.md');
  const writingList = collectionApi.getFilteredByGlob('src/writing/**/*.md');

  const allOfIt = blogList.concat(writingList);
  // Sort by title, probably?
  allOfIt.sort((a, b) => {
    const aTitle = a.data.title.toLowerCase();
    const bTitle = b.data.title.toLowerCase();
    if (aTitle < bTitle) {
      return -1;
    } else if (aTitle > bTitle) {
      return 1;
    } else {
      return 0;
    }
  });
  return allOfIt;
}

module.exports = allTheWriting;
