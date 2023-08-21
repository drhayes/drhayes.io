const fakeTags = new Set(['article', 'blog', 'stub', 'writing']);

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
