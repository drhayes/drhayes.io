import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { getPage, getAllBlogPages } from '../../../lib/pages';
import MarkdownPage from '../../../lib/components/markdownPage';

export default function AnyOlPage({ page }) {
  return <MarkdownPage page={page} />;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  const page = await getPage(`/blog/${slug}`);
  const renderedPage = await page.render();
  return {
    props: {
      page: renderedPage,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allBlogPages = await getAllBlogPages();
  const blogs = allBlogPages.map((blogPage) => {
    const [, blogSlug] = blogPage.slug.match(/\/blog\/([\w-]+)\/?$/i);
    return blogSlug;
  });
  return {
    paths: blogs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};
