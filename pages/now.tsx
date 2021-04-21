import React from 'react';
import { GetStaticProps } from 'next';
import { getPage } from '../lib/pages';
import MarkdownPage from '../lib/components/markdownPage';

export default function Now({ page }) {
  return <MarkdownPage page={page} />;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const page = await getPage('now.mdx');
  return {
    props: {
      page: page.toJSON(),
    },
  };
};
