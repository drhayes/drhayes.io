function principles(collectionApi) {
  const principlesList = collectionApi.getFilteredByGlob('src/principles/*.md');
  // Sort by title, probably?
  principlesList.sort((a, b) => {
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
  return principlesList;
}

module.exports = principles;

