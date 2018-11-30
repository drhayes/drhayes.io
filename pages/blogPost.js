import React from 'react';
import Layout from '../components/layout';
import BlogTitleStuff from '../components/blogTitleStuff';
import remark from 'remark';
import remark2react from 'remark-react';
import { withRouter } from 'next/router'

const BlogPost = ({ router: { query: post } }) => {
  return (
    <Layout title={post.frontmatter.title}>
      <BlogTitleStuff post={post} />
      {
        remark()
          .use(remark2react)
          .processSync(post.body).contents
      }
    </Layout>
  );
};

export default withRouter(BlogPost);
