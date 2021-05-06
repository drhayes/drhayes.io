import BaseLayout from './baseLayout';
import PageHeader from './pageHeader';
import styles from './pageLayout.module.css';
import FormattedDate from './formattedDate';
import TagsList from './tagsList';

export default function PageLayout({
  title,
  created,
  updated,
  tags,
  children,
}: {
  title?: string;
  created?: string;
  updated?: string;
  tags?: string[];
  children?: any;
}) {
  let createdElem = null;
  if (created) {
    createdElem = <FormattedDate date={created} />;
  }
  let updatedElem = null;
  if (updated) {
    updatedElem = <FormattedDate date={updated} prefix="(Updated " suffix=")" />;
  }
  let tagsElem = null;
  if (tags) {
    tagsElem = (
      <div className={styles.tagsContainer}>
        <TagsList tags={tags} />
      </div>
    );
  }

  return (
    <BaseLayout title={title}>
      <main className={styles.container}>
        <PageHeader />
        <header className={styles.titleContainer}>
          <h1 className={`${styles.title} ${styles.dottedBorder}`}>{title}</h1>
          {createdElem}
          {updatedElem}
          {tagsElem}
        </header>
        {children}
      </main>
    </BaseLayout>
  );
}
