import React from 'react';
import { GetStaticProps } from 'next';
import PageLayout from '../lib/components/pageLayout';
import { getMDXComponent } from 'mdx-bundler/client';
import { getPage } from '../lib/pages';
import styles from './now.module.css';

export default function Now({ code, frontmatter }) {
  const Component = getMDXComponent(code);
  if (frontmatter.updated) {
    frontmatter.updated = new Date(frontmatter.updated);
  }
  if (frontmatter.created) {
    frontmatter.created = new Date(frontmatter.created);
  }

  return (
    <PageLayout title={frontmatter.title} updated={frontmatter.updated} articleStyles={styles.article}>
      <article className={styles.article}>
        <Component />
      </article>
    </PageLayout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { code, frontmatter } = await getPage('now.mdx');
  // Fix those date objects.
  if (frontmatter.updated) {
    frontmatter.updated = frontmatter.updated.toISOString();
  }
  if (frontmatter.created) {
    frontmatter.created = frontmatter.created.toISOString();
  }

  return {
    props: {
      code,
      frontmatter,
    },
  };
};
