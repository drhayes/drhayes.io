
function myWriting(collectionApi) {
  const things = collectionApi.getFilteredByGlob('src/writing/**/*.md');
  return things
    .concat(collectionApi.getFilteredByGlob('src/principles/index.njk'));
}

module.exports = myWriting;
