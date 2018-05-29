const path = require('path');

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators;
  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent);
    console.log(fileNode);

    createNodeField({ node, name: 'cats', value: 'pants' });
  }
}

exports.createPages = async ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  const allMarkdown = await graphql(`
  `);
  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        ``
      ).then(result => {
        if (result.errors) {
          reject(result.errors);
        }

        console.log(result);
      }));
  });
}
