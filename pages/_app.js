import React from 'react';
import App, { Container } from 'next/app';
import { MDXProvider } from '@mdx-js/tag';
import RemarkLowlight from 'remark-react-lowlight';
import js from 'highlight.js/lib/languages/javascript';
import Layout from '../components/layout';

// import 'highlight.js/styles/a11y-light.css';
import 'highlight.js/styles/atelier-forest-light.css';

const components = {
  code: RemarkLowlight({ js })
};

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render () {
    const { Component, pageProps } = this.props;

    return (
      <MDXProvider components={components}>
        <Layout>
          <Container>
            <Component {...pageProps} />
          </Container>
        </Layout>
      </MDXProvider>
    );
  }
}
