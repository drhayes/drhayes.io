const blogList = require('./blog');
const gamesList = require('./games');
const quotesList = require('./quotes');
const linksList = require('./links');

function allTheWriting(collectionApi) {
  const principleList = collectionApi.getFilteredByTag('principle');

  const allOfIt = blogList(collectionApi)
    .concat(quotesList(collectionApi))
    .concat(principleList)
    .concat(gamesList(collectionApi))
    .concat(linksList(collectionApi));

  return allOfIt;
}

module.exports = allTheWriting;
