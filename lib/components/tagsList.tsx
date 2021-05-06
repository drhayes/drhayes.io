import styles from './tagsList.module.css';
import Link from 'next/link';

export default function TagsList({ tags, className }: { tags: string[]; className?: string }) {
  if (!tags) {
    return null;
  }
  console.log(tags);
  const tagElems = tags.map((tag, i) => {
    return (
      <li className={styles.item} key={i}>
        <Link href={`/tags/${tag}`}>
          <a className={styles.link}>{tag}</a>
        </Link>
      </li>
    );
  });
  let listOfClasses = styles.list;
  if (className) {
    listOfClasses = `${className} ${styles.list}`;
  }
  return <ul className={listOfClasses}>{tagElems}</ul>;
}
