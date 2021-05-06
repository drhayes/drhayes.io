import React from 'react';
import PageLayout from './pageLayout';
import hydrate from 'next-mdx-remote/hydrate';
import styles from './markdownPage.module.css';
import components from '../mdxComponents';

export default function MarkdownPage({ page }) {
  const { mdxSource, frontmatter } = page;
  const content = hydrate(mdxSource, { components });

  return (
    <PageLayout
      title={frontmatter.title}
      updated={frontmatter.updated}
      created={frontmatter.date}
      tags={frontmatter.tags}
    >
      <article className={styles.article}>{content}</article>
    </PageLayout>
  );
}
