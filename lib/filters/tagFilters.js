const fakeTags = new Set(['article', 'stub', 'allTheWriting', 'allTheTags']);

function isRealTag(tag) {
  return !fakeTags.has(tag);
}

function onlyRealTags(tags) {
  if (!tags) {
    return;
  }

  return tags.filter(isRealTag);
}

module.exports = {
  isRealTag,
  onlyRealTags,
};
