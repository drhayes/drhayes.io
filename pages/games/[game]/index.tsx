import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { getPage, getAllPages, getGames } from '../../../lib/pages';
import MarkdownPage from '../../../lib/components/markdownPage';

export default function GameIndex({ page }) {
  return <MarkdownPage page={page} />;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { game } = params;
  const page = await getPage(`/games/${game}/index`);
  const renderedPage = await page.render();
  return {
    props: {
      page: renderedPage,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allGames = await getGames();
  const games = allGames.map((game) => {
    const [, gameName] = game.slug.match(/\/games\/([\w-]+)\/.*$/i);
    return gameName;
  });
  return {
    paths: games.map((game) => ({ params: { game } })),
    fallback: false,
  };
};
