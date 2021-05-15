import React from 'react';
import PageLayout from './pageLayout';
import { MDXRemote } from 'next-mdx-remote';
import styles from './markdownPage.module.css';
import components from '../mdxComponents';

export default function MarkdownPage({ page }) {
  const { mdxSource, frontmatter } = page;

  return (
    <PageLayout
      title={frontmatter.title}
      updated={frontmatter.updated}
      created={frontmatter.date}
      tags={frontmatter.tags}
    >
      <MDXRemote {...mdxSource} components={components} className={styles.article} />
    </PageLayout>
  );
}
