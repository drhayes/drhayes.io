import TagsList from './tagsList';
import styles from './pageListItem.module.css';
import Link from 'next/link';

export default function PageListItem({ page, className }) {
  const { frontmatter } = page;
  return (
    <div className={className}>
      <h2 className={styles.title}>
        <Link href={page.slug}>
          <a>{frontmatter.title}</a>
        </Link>
      </h2>
      <div className={styles.description}>{frontmatter.description}</div>
      <TagsList className={styles.tags} tags={frontmatter.tags} />
    </div>
  );
}
