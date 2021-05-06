import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { getPage, getGames } from '../../lib/pages';
import MarkdownPage from '../../lib/components/markdownPage';

export default function GameIndex({ page }) {
  return <MarkdownPage page={page} />;
}

export const getStaticProps: GetStaticProps = async ({ params: { game } }) => {
  const page = await getPage(`/games/${game}`);
  const renderedPage = await page.render();
  return {
    props: {
      page: renderedPage,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allGames = await getGames();
  const gameSlugs = allGames.map(({ slug }) => {
    // Assumes all games are onder "/games/thing/". If that's not the case, this'll break.
    const modifiedSlug = slug.replace(/\/games\//, '').replace(/\/$/i, '');
    return {
      params: {
        game: modifiedSlug,
      },
    };
  });
  return {
    paths: gameSlugs,
    fallback: false,
  };
};
