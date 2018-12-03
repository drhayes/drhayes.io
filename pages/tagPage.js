import React from 'react';
import { withRouter } from 'next/router'
import Layout from '../components/layout';
import BlogTitleStuff from '../components/blogTitleStuff';
import styled from '@emotion/styled';

const NoNumberList = styled('ol')`
  padding-left: 1em;
  list-style-type: none;
`;

const TagPage = ({ router }) => {
  const { tag, posts } = router.query;
  posts.sort((a, b) => a.frontmatter.date < b.frontmatter.date);
  return (
    <Layout>
      <h1>Blog posts tagged "{tag}"</h1>
      <NoNumberList>
        {posts.map((post, i) => (
          <li key={i}>
            <BlogTitleStuff post={post} isH1={false} />
          </li>
        ))}
      </NoNumberList>
    </Layout>
  );
};

export default withRouter(TagPage);
