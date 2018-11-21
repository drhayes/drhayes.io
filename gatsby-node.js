const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require('path');
const dayjs = require('dayjs');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  const parentNode = getNode(node.parent);
  if (node.internal.type === `MarkdownRemark` && parentNode && parentNode.sourceInstanceName === 'posts') {
    // I always write in CST, so just adjust the incoming date to reflect that.
    // Makes the slug actually work instead of "losing" a day.
    const date = dayjs(node.frontmatter.date).add(5, 'hour');
    const slug = createFilePath({ node, getNode, basePath: `src/posts` });
    createNodeField({
      node,
      name: `slug`,
      value: `/${date.format('YYYY/MM/DD')}${slug}`,
    });
    createNodeField({
      node,
      name: 'blogPost',
      value: true
    });
  }
  if (node.internal.type === 'MarkdownRemark' && parentNode && parentNode.sourceInstanceName === 'games') {
    const slug = createFilePath({ node, getNode, basePath: `src/games` });
    createNodeField({
      node,
      name: 'slug',
      value: `/games${slug}`,
    });
    createNodeField({
      node,
      name: 'gamePost',
      value: true,
    });
  }
}

const makeBlogPostPages = ({ graphql, actions, getNode }) => graphql(`
{
  allMarkdownRemark(
    sort: { order: DESC, fields: [frontmatter___date] }
    filter: { fields: { blogPost: { eq: true } }, frontmatter: { published: { eq: true } } }
  ) {
    edges {
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
          published
        }
        html
      }
    }
  }
}`).then(result => {
  const { createPage } = actions;
  const posts = result.data.allMarkdownRemark.edges;
  posts
    .forEach(({ node }, index) => {
      const previous = index === posts.length - 1 ? null: posts[index + 1].node;
      const next = index === 0 ? null : posts[index - 1].node
      createPage({
        path: node.fields.slug,
        component: path.resolve('./src/templates/blogPost.js'),
        context: {
          slug: node.fields.slug,
          previous,
          next
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
  allMarkdownRemark(
    sort: { order: DESC, fields: [frontmatter___date] }
    filter: { fields: { gamePost: { eq: true } } }
  ) {
    edges {
      node {
        fields {
          slug
        }
        frontmatter {
          title
          date
        }
        htmlAst
      }
    }
  }
}`).then(result => {
  const { createPage } = actions;
  const gamePages = result.data.allMarkdownRemark.edges;
  gamePages
    .forEach(({ node }) => {
      const { frontmatter: { title }, htmlAst, fields: { slug } } = node;
      createPage({
        path: slug,
        component: path.resolve('./src/templates/gamePage.js'),
        context: {
          title,
          htmlAst,
        }
      });
    });
});


exports.createPages = (params) => {
  const { createRedirect } = params.actions;
  // Add some redirects.
  createRedirect({ fromPath: "/gemini-rising/technology", toPath: "/gemini-rising/articles/technology/", isPermanent: true });
  createRedirect({ fromPath: "/blaster/intro", toPath: "/blaster/articles/intro/", isPermanent: true });
  createRedirect({ fromPath: "/blaster/part-one", toPath: "/blaster/articles/part-one/", isPermanent: true });
  createRedirect({ fromPath: "/blaster/part-two", toPath: "/blaster/articles/part-two/", isPermanent: true });
  createRedirect({ fromPath: "/blaster/part-three", toPath: "/blaster/articles/part-three/", isPermanent: true });

  // Generate the pages I care about.
  return Promise.all([
    makeBlogPostPages(params),
    makeTagPages(params),
    makeGamePages(params),
  ]);
}
