function books(collectionApi) {
  const booksList = collectionApi.getFilteredByGlob('src/books/**/*.md');
  // Sort by title, probably?
  booksList.sort((a, b) => {
    const aTitle = a.title;
    const bTitle = b.title;
    return aTitle.localeCompare(bTitle);
  });
  return booksList;
}

module.exports = books;

