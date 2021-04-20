import styles from './pageHeader.module.css';
import Raven from './raven';
import SiteMenu from './siteMenu';

export default function PageHeader() {
  return (
    <div className={styles.container}>
      <a href="/">
        <Raven className={styles.logo} />
      </a>
      <SiteMenu className={styles.menu} />
    </div>
  );
}
