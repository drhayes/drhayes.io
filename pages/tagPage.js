import React from 'react';
import { withRouter } from 'next/router'
import Layout from '../components/layout';
import BlogTitleStuff from '../components/blogTitleStuff';

const TagPage = ({ router }) => (
  <Layout>
    <h1>Blog posts tagged "{router.query.tag}"</h1>
    {router.query.posts.map(post => (
      <BlogTitleStuff key={post.title} post={post} isH1={false} />
    ))}
  </Layout>
);

export default withRouter(TagPage);
