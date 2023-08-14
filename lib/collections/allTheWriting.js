function allTheWriting(collectionApi) {
  const blogList = collectionApi.getFilteredByGlob('src/blog/**/*.md');
  const writingList = collectionApi.getFilteredByGlob('src/writing/**/*.md');
  const principleList = collectionApi.getFilteredByGlob('src/principles/*.md');

  const allOfIt = blogList.concat(writingList).concat(principleList);
  return allOfIt;
}

module.exports = allTheWriting;
