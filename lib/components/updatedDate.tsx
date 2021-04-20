import styles from './updatedDate.module.css';
import { format } from 'date-fns';

export default function UpdatedDate({ date }) {
  const formatted = format(date, 'y.LL.dd');
  const iso = format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
  return (
    <time className={styles.time} dateTime={iso}>
      (Updated {formatted})
    </time>
  );
}
