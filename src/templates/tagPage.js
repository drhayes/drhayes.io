import React from 'react';
import Helmet from 'react-helmet';
import Layout from '../components/layout';
import { graphql } from 'gatsby'
import BlogTitleStuff from '../components/blogTitleStuff';
import styled from 'react-emotion';

const ArchiveList = styled('ol')`
  padding-left: 2em;
  margin-bottom: 1.2em;
  list-style-type: none;
`;

const TagPage = (topLevelData) => {
  const { pageContext: { tag } } = topLevelData;
  const title = `Posts Tagged "${tag}"`;
  const posts = topLevelData.data.allMarkdownRemark.edges.map(({ node }) => node);
  return (
    <React.Fragment>
      <Layout data={topLevelData}>
        <h1>{title}</h1>

        <ArchiveList>
          {posts.map(post => (
            <li key={post.id}>
              <BlogTitleStuff post={post} isH1={false} />
              <div>{post.excerpt}</div>
            </li>
          ))}
        </ArchiveList>
      </Layout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>
    </React.Fragment>
  );
};

export default TagPage;

export const pageQuery = graphql`
  query BlogPostsByTag($tag: String) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 1000
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            tags
          }
          excerpt
        }
      }
    }
  }`;
