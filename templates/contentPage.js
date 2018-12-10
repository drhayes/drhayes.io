import React from 'react';
import { withRouter } from 'next/router'
import Layout from '../components/layout';
import markdownProcessor from '../lib/markdownProcessor';

const ArticleList = () => <h2>Hey there</h2>;

const ContentPage = ({ router }) => {
  const { content } = router.query;
  const processed = markdownProcessor(content);
  return (
    <Layout>
      <h1>{processed.data.title}</h1>
      { processed.contents }
    </Layout>
  );
};

export default withRouter(ContentPage);
