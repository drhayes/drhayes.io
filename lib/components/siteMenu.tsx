import styles from './siteMenu.module.css';
import Link from 'next/link';

export default function SiteMenu({ className }) {
  const menu = [
    { name: 'Now', url: '/now' },
    { name: 'Lately', url: '/lately' },
    { name: 'Notes', url: 'https://notes.drhayes.io' },
    { name: 'Blog', url: '/blog' },
    { name: 'Games', url: '/games' },
    { name: 'About', url: '/about' },
  ];

  const menuElems = menu.map(({ name, url }, i) => (
    <li className={styles.item} key={i}>
      <Link href={url}>
        <a>{name}</a>
      </Link>
    </li>
  ));

  return (
    <nav>
      <ol className={` ${className} ${styles.menu}`}>{menuElems}</ol>
    </nav>
  );
}
