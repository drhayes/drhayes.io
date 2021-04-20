import BaseLayout from './baseLayout';
import PageHeader from './pageHeader';
import styles from './pageLayout.module.css';
import UpdatedDate from '../components/updatedDate';

export default function PageLayout({ title, updated, children }) {
  let updatedElem = null;
  if (updated) {
    updatedElem = <UpdatedDate date={updated} />;
  }

  return (
    <BaseLayout>
      <main className={styles.container}>
        <PageHeader />
        <header className={styles.titleContainer}>
          <h1 className={`${styles.title} ${styles.dottedBorder}`}>{title}</h1>
          {updatedElem}
        </header>
        <article>{children}</article>
      </main>
    </BaseLayout>
  );
}
