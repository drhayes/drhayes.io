import React from 'react';
import Layout from '../components/layout';
import BlogTitleStuff from '../components/blogTitleStuff';
import { withRouter } from 'next/router'
import markdownProcessor from '../lib/markdownProcessor';

const BlogPost = ({ router: { query: post } }) => {
  const processed = markdownProcessor(post.body);
  return (
    <Layout title={post.frontmatter.title}>
      <BlogTitleStuff post={post} />
      {processed.contents}
    </Layout>
  );
};

export default withRouter(BlogPost);
