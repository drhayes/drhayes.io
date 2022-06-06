const filterOut = [
  'blog',
  'stub',
];

function tagFilter(tags) {
  if (!tags) {
    return;
  }

  const filtered = tags.filter(tag => filterOut.indexOf(tag) === -1);
  return filtered;
}

module.exports = tagFilter;

