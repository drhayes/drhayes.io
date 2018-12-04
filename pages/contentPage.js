import React from 'react';
import { withRouter } from 'next/router'
import Layout from '../components/layout';
import remark from 'remark';
import remark2react from 'remark-react';
import frontmatter from 'remark-frontmatter';
import extract from 'remark-extract-frontmatter';
import yaml from 'yaml';
import emoji from 'remark-emoji';

const ContentPage = ({ router }) => {
  const { content } = router.query;
  const processed = remark()
    .use(remark2react)
    .use(frontmatter, ['yaml'])
    .use(extract, { yaml: yaml.parse })
    .use(emoji)
    .processSync(content);
  return (
    <Layout>
      <h1>{processed.data.title}</h1>
      { processed.contents }
    </Layout>
  );
};

export default withRouter(ContentPage);
