import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { getPage, getAllPages } from '../lib/pages';
import MarkdownPage from '../lib/components/markdownPage';

export default function AnyOlPage({ page }) {
  return <MarkdownPage page={page} />;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slugArray = params.slug as string[];
  const slug = `${slugArray.join('/')}.mdx`;
  const page = await getPage(slug as string);
  const renderedPage = await page.render();
  return {
    props: {
      page: renderedPage,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPages = await getAllPages();
  const allSlugs = allPages.map(({ slug }) => {
    const modifiedSlug = slug.replace(/^\//, '');
    const slugArray = modifiedSlug.split('/');
    return {
      params: {
        slug: slugArray,
      },
    };
  });
  return {
    paths: allSlugs,
    fallback: false,
  };
};
