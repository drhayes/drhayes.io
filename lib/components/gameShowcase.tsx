import Link from 'next/link';
import { GameInfo } from '../pages';
import styles from './gameShowcase.module.css';

export default function GameShowcase({ game }: { game: GameInfo }) {
  return (
    <section className={styles.container} style={{ backgroundImage: `url('${game.screenshotPath}` }}>
      <h1 className={styles.title}>
        <Link href={game.slug}>
          <a>{game.name}</a>
        </Link>
      </h1>
    </section>
  );
}
