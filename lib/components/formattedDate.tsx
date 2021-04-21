import styles from './formattedDate.module.css';
import { format } from 'date-fns';

export default function FormattedDate({ date, prefix = '', suffix = '', className = '' }) {
  if (!date) {
    return null;
  }
  date = new Date(date);
  const formatted = format(date, 'y.LL.dd');
  const iso = format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
  return (
    <time className={`${className} ${styles.time}`} dateTime={iso}>
      {prefix}
      {formatted}
      {suffix}
    </time>
  );
}
