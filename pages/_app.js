import '../styles/globals.css';
import Head from 'next/head';

// Add support for languages I care about.
import Prism from 'prism-react-renderer/prism';
global.Prism = Prism;
require('prismjs/components/prism-lua');

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
