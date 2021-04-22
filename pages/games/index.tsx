import PageLayout from '../../lib/components/pageLayout';
import styles from './gamesList.module.css';
import GameShowcase from '../../lib/components/gameShowcase';
import { GetStaticProps } from 'next';
import { getGames } from '../../lib/pages';

export default function GamesList({ games }) {
  const gameElems = games.map((game, i) => {
    return (
      <li className={styles.item} key={i}>
        <GameShowcase game={game} />
      </li>
    );
  });
  return (
    <PageLayout title="Games">
      <ol className={styles.list}>{gameElems}</ol>
    </PageLayout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const games = await getGames();
  return {
    props: {
      games,
    },
  };
};

/**---
title: Games
layout: default.njk
---
<ol class="flex flex-wrap justify-between">
  {% for game in collections.games %}
  <li class="flex flex-1 justify-center content-center m-2 p-20 bg-cover" style="background-image: url('{{ game.data.screenshot }}')">
    <h2 class="text-3xl text-center game-title">
      <a href="{{ game.url }}" class="normal-case">{{ game.data.title }}</a>
    </h2>
  </li>
  {% endfor %}
</ol>
 */
