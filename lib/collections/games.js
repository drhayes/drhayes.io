function games(collectionApi) {
  const gamesList = collectionApi.getFilteredByGlob('src/games/**/index.md');
  // Sort by title, probably?
  gamesList.sort((a, b) => {
    const aTitle = a.data.title;
    const bTitle = b.data.title;
    return aTitle.localeCompare(bTitle);
  });
  return gamesList;
}

module.exports = games;
