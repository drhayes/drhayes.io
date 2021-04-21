import React from 'react';
import PageLayout from './pageLayout';
import { getMDXComponent } from 'mdx-bundler/client';
import styles from './markdownPage.module.css';

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
