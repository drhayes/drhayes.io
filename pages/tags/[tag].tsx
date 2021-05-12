import React from 'react';
import Link from 'next/link';
import { GetStaticProps, GetStaticPaths } from 'next';
import { getTagMap } from '../../lib/pages';
import pageSorter from '../../lib/pageSorter';
import PageLayout from '../../lib/components/pageLayout';
import styles from './tagList.module.css';

export default function TagPage({ tag, pageListing }) {
  pageListing.forEach((page) => {
    if (page.frontmatter.date) {
      page.frontmatter.date = new Date(page.frontmatter.date);
    }
  });
  const pageLinks = pageListing.sort(pageSorter).map((page, i) => (
    <li key={i} className={styles.item}>
      <h2>
        <Link href={page.slug}>
          <a>{page.frontmatter.title}</a>
        </Link>
      </h2>
      <p>{page.frontmatter.description}</p>
    </li>
  ));
  return (
    <PageLayout title={`#${tag}`}>
      <ol className={styles.list}>{pageLinks}</ol>
    </PageLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params: { tag } }) => {
  const tagMap = await getTagMap();
  const pages = tagMap.get(tag as string);
  const pageListing = pages.map((page) => {
    return {
      frontmatter: page.serializeFrontmatter(),
      slug: page.slug,
    };
  });
  return {
    props: {
      tag,
      pageListing,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const tagMap = await getTagMap();
  const tagSlugs = [];
  tagMap.forEach((page, tag) => {
    tagSlugs.push({
      params: {
        tag,
      },
    });
  });
  return {
    paths: tagSlugs,
    fallback: false,
  };
};
