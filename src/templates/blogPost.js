import React from 'react';
import Helmet from 'react-helmet';
import Layout from '../components/layout';
import { graphql } from 'gatsby'
import FormattedDate from '../components/formattedDate';
import dayjs from 'dayjs';

const BlogPost = (topLevelData) => {
  const { data } = topLevelData;
  const title = data.markdownRemark.frontmatter.title;
  const date = dayjs(data.markdownRemark.frontmatter.date);
  return (
    <React.Fragment>
      <Layout data={topLevelData}>
        <h1>{title}</h1>

        <span style={{ opacity: 0.5 }}>Published: </span>
        <FormattedDate date={date} />

        <div dangerouslySetInnerHTML={{
            __html: data.markdownRemark.html
        }} />

      </Layout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={data.markdownRemark.excerpt.trim()} />
      </Helmet>
    </React.Fragment>
  );
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
      fields {
        slug
      }
    }
  }
`;
