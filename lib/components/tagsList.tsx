import styles from './tagsList.module.css';
import Link from 'next/link';

export default function TagsList({ tags, className }) {
  if (!tags) {
    return null;
  }
  const tagElems = tags.map((tag, i) => {
    return (
      <li className={styles.item} key={i}>
        <Link href={`/tags/${tag}`}>
          <a>{tag}</a>
        </Link>
      </li>
    );
  });
  return <ul className={`${className} ${styles.list}`}>{tagElems}</ul>;
}
