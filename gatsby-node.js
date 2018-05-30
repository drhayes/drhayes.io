const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators;
  if (node.internal.type === 'MarkdownRemark') {
    const nodePath = createFilePath({
      node,
      getNode,
      basePath: 'pages/',
      trailingSlash: false
    });
    createNodeField({ node, name: 'path', value: nodePath });
  }
}

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
            fields {
              path
            }
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

  const markdownPageTemplate = path.resolve('src/templates/markdownPage.js');
  const gamePostTemplate = path.resolve('src/templates/gamePost.js');
  const gamePostIndexTemplate = path.resolve('src/templates/gameIndexPost.js');

  // Game posts.
  allMarkdown.data.allMarkdownRemark.edges
    .filter(({ node }) => node.frontmatter.game)
    .forEach(({ node }) => {
      const matches = node.fileAbsolutePath.match(/pages\/(games\/\w+\/\w+)\.md$/i);
      if (matches.length) {
        const path = matches[1].replace(/index$/, '');
        const component = matches[1].includes('index') ? gamePostIndexTemplate : gamePostTemplate;
        createPage({
          path, component,
          context: {
            absolutePath: node.fileAbsolutePath,
            game: node.frontmatter.game
          }
        });
      }
    });

  // Other posts.
  allMarkdown.data.allMarkdownRemark.edges
    // We don't need to handle game pages anymore.
    .filter(({ node }) => !node.frontmatter.game)
    .forEach(({ node }) => {
      createPage({
        path: node.fields.path,
        component: markdownPageTemplate,
        context: {
          absolutePath: node.fileAbsolutePath
        }
      });
    });
}
