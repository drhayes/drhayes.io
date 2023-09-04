function allTheWriting(collectionApi) {
  const blogList = collectionApi.getFilteredByGlob('src/blog/**/*.md');
  const writingList = collectionApi.getFilteredByGlob('src/writing/**/*.md');
  const principleList = collectionApi.getFilteredByTag('principle');
  const gamesList = collectionApi.getFilteredByGlob('src/games/**/index.md');

  const allOfIt = blogList
    .concat(writingList)
    .concat(principleList)
    .concat(gamesList);

  return allOfIt;
}

module.exports = allTheWriting;
