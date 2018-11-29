import React from 'react';
import { MDXProvider } from '@mdx-js/tag';

const components = {};

export default ({ Component, pageProps }) => (
  <MDXProvider components={components}>
    <Component {...pageProps} />
  </MDXProvider>
);
