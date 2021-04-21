import React from 'react';
import { GetStaticProps } from 'next';
import PageLayout from '../lib/components/pageLayout';
import { getMDXComponent } from 'mdx-bundler/client';
import { getPage } from '../lib/pages';
import styles from './now.module.css';

export default function Now({ page }) {
  const { code, frontmatter } = page;
  const Component = getMDXComponent(code);

  return (
    <PageLayout title={frontmatter.title} updated={frontmatter.updated} articleStyles={styles.article}>
      <article className={styles.article}>
        <Component />
      </article>
    </PageLayout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const page = await getPage('now.mdx');
  return {
    props: {
      page: page.toJSON(),
    },
  };
};
