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
