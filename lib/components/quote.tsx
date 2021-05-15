import styles from './quote.module.css';

export default function Quote({ attribution, children }: { attribution?: string; children?: any }) {
  let attributionElem = null;
  if (attribution) {
    attributionElem = <figcaption>{attribution}</figcaption>;
  }
  return (
    <figure className={styles.quote}>
      <blockquote>{children}</blockquote>
      {attributionElem}
    </figure>
  );
}
