import Link from 'next/link';
import { GameInfo } from '../pages';
import styles from './gameShowcase.module.css';

export default function GameShowcase({ game }: { game: GameInfo }) {
  return (
    <Link href={`${game.slug}/`}>
      <a className={styles.container}>
        <section className={styles.innerContainer} style={{ backgroundImage: `url('${game.screenshotPath}` }}>
          <h1 className={styles.title}>{game.name}</h1>
        </section>
      </a>
    </Link>
  );
}
