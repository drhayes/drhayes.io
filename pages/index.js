import Head from 'next/head';
import Layout from '../components/layout';
import Raven from '../components/raven';
import styles from './index.module.css';
import SiteMenu from '../components/site-menu';

export default function Home() {
  return (
    <Layout>
      <div className={styles.center}>
        <main className={styles.main}>
          <a href="/" title="drhayes.io" className={styles.logo}>
            <Raven />
          </a>

          <div className={styles.hellothere}>
            <h1 className={styles.hi}>Hi. 👋🏽</h1>
            <h2 className={styles.myname}>My name is David Hayes.</h2>
            <a href="mailto:hi@drhayes.io" rel="me">
              hi@drhayes.io
            </a>
          </div>

          <h3 className={styles.dostuff}>I do stuff with computers. I live in Austin, TX.</h3>

          <SiteMenu className={styles.siteMenu} />
        </main>
      </div>

      <footer style={{ display: 'none' }}>
        <div className={'h-card'}>
          <a href="https://drhayes.io" className={'p-name u-url'}>
            David Hayes
          </a>
          <a href="mailto:hi@drhayes.io" className={'u-email'} rel="me">
            hi@drhayes.io
          </a>
        </div>
        <ul>
          <li>
            <a href="https://github.com/drhayes" rel="me">
              github.com/drhayes
            </a>
          </li>
          <li>
            <a href="https://notes.drhayes.io" rel="me">
              notes.drhayes.io
            </a>
          </li>
        </ul>
      </footer>
    </Layout>
  );
}
