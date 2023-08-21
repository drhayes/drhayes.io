const filterOut = new Set(['article', 'blog', 'stub', 'writing']);

function tagFilter(tags) {
  if (!tags) {
    return;
  }

  const filtered = tags.filter((tag) => !filterOut.has(tag));
  return filtered;
}

module.exports = tagFilter;
