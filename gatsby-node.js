const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require('path');
const dayjs = require('dayjs');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const date = dayjs(node.frontmatter.date);
    const slug = createFilePath({ node, getNode, basePath: `posts/` });
    createNodeField({
      node,
      name: `slug`,
      value: `/${date.format('YYYY/MM/DD')}${slug}`,
    });
  }
}

exports.createPages = ({ graphql, actions }) => {
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              date
            }
            html
          }
        }
      }
    }
  `
  ).then(result => {
    const { createPage } = actions;

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve('./src/templates/blogPost.js'),
        context: {
          slug: node.fields.slug
        }
      });
    });
  });
}
