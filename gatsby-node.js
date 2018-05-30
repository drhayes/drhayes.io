const path = require('path');

// exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
//   const { createNodeField } = boundActionCreators;
//   if (node.internal.type === 'MarkdownRemark') {
//     const fileNode = getNode(node.parent);
//     console.log(fileNode);

//     createNodeField({ node, name: 'cats', value: 'pants' });
//   }
// }

exports.createPages = async ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  const allMarkdown = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            id
            fileAbsolutePath
            html
            frontmatter {
              title
              date
              game
            }
          }
        }
      }
    }
  `);

  const gamePostTemplate = path.resolve('src/templates/gamePost.js');

  // Game posts.
  allMarkdown.data.allMarkdownRemark.edges
    .filter(({ node }) => node.frontmatter.game)
    .forEach(({ node }) => {
      const matches = node.fileAbsolutePath.match(/pages\/(games\/\w+\/\w+)\.md$/i);
      if (matches.length) {
        createPage({
          path: matches[1],
          component: gamePostTemplate,
          context: {
            absolutePath: node.fileAbsolutePath
          }
        });
      }
    });
    // createPage({
      // path: '/thing',
      // context: {}
    // });
}
