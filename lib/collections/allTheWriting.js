const { compareDesc, parse } = require('date-fns');

const referenceDate = new Date('2023-08-14T10:24:00.000-06:00');

function allTheWriting(collectionApi) {
  const blogList = collectionApi.getFilteredByGlob('src/blog/**/*.md');
  const writingList = collectionApi.getFilteredByGlob('src/writing/**/*.md');
  const principleList = collectionApi.getFilteredByGlob('src/principles/*.md');

  const allOfIt = blogList.concat(writingList).concat(principleList);
  // Sort by updated date if we can, then given date, then title if nothing else.
  allOfIt.sort((a, b) => {
    let aDate = a.date;
    if (a.data.updated) {
      aDate = parse(a.data.updated, 'yyyy-MM-dd', referenceDate);
    }
    let bDate = a.date;
    if (b.data.updated) {
      bDate = parse(b.data.updated, 'yyyy-MM-dd', referenceDate);
    }
    if (aDate && bDate) {
      return compareDesc(aDate, bDate);
    } else if (aDate && !bDate) {
      return -1;
    } else if (!aDate && bDate) {
      return 1;
    }

    // No dates, so compare by title.
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
