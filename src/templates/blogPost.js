import React from 'react';
import Helmet from 'react-helmet';
import Layout from '../components/layout';
import { graphql } from 'gatsby'
import BlogTitleStuff from '../components/blogTitleStuff';
import BlogContent from '../components/blogContent';
import { Link } from 'gatsby';
import styled from 'react-emotion';

const NavLabel = styled('dt')`
  text-transform: uppercase;
  letter-spacing: 4px;
  opacity: 0.6;
  margin-top: 1em;
  margin-bottom: 0.2em;
`;

const PostNav = ({ previous, next }) => {
  const previousElem = previous && (
    <React.Fragment>
      <NavLabel>Previous</NavLabel>
      <dd>
        ← <Link to={previous.fields.slug}>{previous.frontmatter.title}</Link>
      </dd>
    </React.Fragment>
  );
  const nextElem = next && (
    <React.Fragment>
      <NavLabel>Next</NavLabel>
      <dd>
        <Link to={next.fields.slug}>{next.frontmatter.title}</Link> →
      </dd>
    </React.Fragment>
  );
  return (
    <nav>
      <dl>
        {nextElem}
        {previousElem}
      </dl>
    </nav>
  );
};

const BlogPost = (topLevelData) => {
  const { next, previous, post } = topLevelData.data;
  const title = post.frontmatter.title;
  return (
    <React.Fragment>
      <Layout data={topLevelData}>
        <article>
          <BlogTitleStuff post={post} />
          <BlogContent content={post.html} />
        </article>
        <PostNav previous={previous} next={next} />
      </Layout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={post.excerpt.trim()} />
      </Helmet>
    </React.Fragment>
  );
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!, $nextId: String, $previousId: String) {
    next: markdownRemark(id: { eq: $nextId }) {
      frontmatter {
        title
      }
      fields {
        slug
      }
    }
    previous: markdownRemark(id: { eq: $previousId }) {
      frontmatter {
        title
      }
      fields {
        slug
      }
    }
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
      }
      fields {
        slug
      }
    }
  }
`;
