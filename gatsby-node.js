const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require('path');
const dayjs = require('dayjs');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    // I always write in CST, so just adjust the incoming date to reflect that.
    // Makes the slug actually work instead of "losing" a day.
    const date = dayjs(node.frontmatter.date).add(5, 'hour');
    const slug = createFilePath({ node, getNode, basePath: `posts/` });
    createNodeField({
      node,
      name: `slug`,
      value: `/${date.format('YYYY/MM/DD')}${slug}`,
    });
  }
}

const makeBlogPostPages = ({ graphql, actions, getNode }) => graphql(`
{
  allMarkdownRemark(
    sort: { order: DESC, fields: [frontmatter___date] }
  ) {
    edges {
      next {
        id
      }
      previous {
        id
      }
      node {
        parent {
          id
        }
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
}`).then(result => {
  const { createPage } = actions;
  result.data.allMarkdownRemark.edges
    .filter(({ node }) => {
      // Check the parent of this node. Is it sitting in the "posts" directory? If so, it's
      // a blog post.
      const parentNode = getNode(node.parent.id);
      return parentNode.sourceInstanceName === 'posts';
    })
    .forEach(({ next, previous, node }) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve('./src/templates/blogPost.js'),
        context: {
          slug: node.fields.slug,
          previousId: next && next.id,
          nextId: previous && previous.id,
        }
      });
    });
});

const makeTagPages = ({ graphql, actions }) => graphql(`
{
  allMarkdownRemark {
    edges {
      node {
        frontmatter {
          tags
        }
      }
    }
  }
}`).then(result => {
  const { createPage } = actions;
  const tagSet = new Set();
  result.data.allMarkdownRemark.edges.forEach(({ node: { frontmatter: { tags }} }) => {
    if (!tags) {
      return;
    }
    tags.forEach(tag => tagSet.add(tag));
  });
  tagSet.forEach(tag => {
    createPage({
      path: `/tags/${tag}`,
      component: path.resolve('./src/templates/tagPage.js'),
      context: {
        tag
      }
    });
  });
});

const makeGamePages = ({ graphql, actions }) => graphql(`
{
  allFile(
    filter: { sourceInstanceName: { eq: "games" }}
  ) {
    edges {
      node {
        name
        childMarkdownRemark {
          html
          frontmatter {
            title
          }
        }
      }
    }
  }
}`).then(result => {
  const { createPage } = actions;
  result.data.allFile.edges
    .forEach(({ node }) => {
      const { name, childMarkdownRemark: { html, frontmatter: { title } } } = node;
      createPage({
        path: `/games/${name}`,
        component: path.resolve('./src/templates/gamePage.js'),
        context: {
          title,
          html,
        }
      });
    });
});


exports.createPages = (params) => {
  return Promise.all([
    makeBlogPostPages(params),
    makeTagPages(params),
    makeGamePages(params),
  ]);
}
