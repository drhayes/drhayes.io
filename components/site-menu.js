import styles from './site-menu.module.css';

export default function SiteMenu({ className }) {
  const menu = [
    { name: 'Now', url: '/now' },
    { name: 'Lately', url: '/lately' },
    { name: 'Notes', url: 'https://notes.drhayes.io' },
    { name: 'Blog', url: '/blog' },
    { name: 'Games', url: '/games' },
    { name: 'About', url: '/about' },
  ];

  const menuElems = menu.map(({ name, url }) => (
    <li className={styles.item}>
      <a href={url}>{name}</a>
    </li>
  ));

  return <ol className={`${styles.menu} ${className}`}>{menuElems}</ol>;
}
