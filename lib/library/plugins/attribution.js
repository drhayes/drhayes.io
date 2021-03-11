const visit = require('unist-util-visit');

function isBlockquote(node) {
  return node.type === 'blockquote';
}

module.exports = function attribution() {
  return function transformer(tree, file) {
    visit(tree, isBlockquote, function visitor(node) {
      console.log(JSON.stringify(node, null, 2));
    });
  }
}
