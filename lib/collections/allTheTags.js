const writingByTag = require('./writingByTag');

function allTheTags(collectionApi) {
  const tagToWritingMap = writingByTag(collectionApi);
  const allTheTags = Array.from(tagToWritingMap.keys()).sort();
  return allTheTags;
}

module.exports = allTheTags;
