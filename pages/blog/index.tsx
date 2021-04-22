import React from 'react';
import { GetStaticProps } from 'next';
import PageLayout from '../../lib/components/pageLayout';
import { getAllBlogPages, SitePage, pageSorter } from '../../lib/pages';
import styles from './blogList.module.css';
import PageListItem from '../../lib/components/pageListItem';
import FormattedDate from '../../lib/components/formattedDate';

export default function BlogListing({ blogPages }) {
  const itemElems = blogPages.map((page, i) => {
    return (
      <li className={styles.item} key={i}>
        <FormattedDate date={page.frontmatter.date} className={styles.date} />
        <PageListItem page={page} className={styles.summary} />
      </li>
    );
  });
  return (
    <PageLayout title="Blog">
      <ol className={styles.list}>{itemElems}</ol>
    </PageLayout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const blogPages: SitePage[] = await getAllBlogPages();
  // Sort by date.
  blogPages.sort(pageSorter);
  return {
    props: {
      blogPages: blogPages.map((blogPage) => blogPage.toJSON()),
    },
  };
};
