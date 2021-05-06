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
      <div className={styles.fullPageHeight}>
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
        <footer className={styles.footer}>
          <div className={styles.inner}>
            <p className={styles.copyright}>
              All content on this site is licensed{' '}
              <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA</a> by David R. Hayes unless otherwise
              noted.
            </p>
            <p className={styles.webring}>
              <a href="https://hotlinewebring.club/drhayes/previous" className={styles.previous}>
                Previous
              </a>
              <a href="https://hotlinewebring.club/">Hotline Webring!</a>
              <a href="https://hotlinewebring.club/drhayes/next" className={styles.next}>
                Next
              </a>
            </p>
          </div>
        </footer>
      </div>
    </BaseLayout>
  );
}
