import BaseLayout from './baseLayout';
import PageHeader from './pageHeader';
import styles from './pageLayout.module.css';
import FormattedDate from '../components/formattedDate';

export default function PageLayout({
  title,
  updated,
  children,
  articleStyles,
}: {
  title?: string;
  updated?: string;
  children?: any;
  articleStyles?: string;
}) {
  let updatedElem = null;
  if (updated) {
    updatedElem = <FormattedDate date={updated} prefix="(Updated " suffix=")" />;
  }

  return (
    <BaseLayout title={title}>
      <main className={styles.container}>
        <PageHeader />
        <header className={styles.titleContainer}>
          <h1 className={`${styles.title} ${styles.dottedBorder}`}>{title}</h1>
          {updatedElem}
        </header>
        {children}
      </main>
    </BaseLayout>
  );
}
