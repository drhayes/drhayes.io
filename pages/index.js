import Head from 'next/head';
import Layout from '../components/layout';
import Raven from '../components/raven';

export default function Home() {
  return (
    <Layout>
      <main>
        <Raven />
      </main>
    </Layout>
  );
}
