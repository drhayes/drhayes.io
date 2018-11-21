import React from 'react';
import Helmet from 'react-helmet';
import Layout from '../components/layout';
import BlogContent from '../components/blogContent';

const GamePage = (data) => {
  const { pageContext: { title, htmlAst } } = data;
  return (
    <React.Fragment>
      <Layout data={data}>
        <h1>{title}</h1>
        <BlogContent htmlAst={htmlAst} />
      </Layout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>
    </React.Fragment>
  );
};

export default GamePage;
