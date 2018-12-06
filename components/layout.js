import React from 'react';
import PropTypes from 'prop-types';
import Nav from './nav';
import styled from '@emotion/styled';
import Head from 'next/head';

import './layout.css'

const Container = styled('main')`
  background-color: #fff;
  padding-left: 1em;
  padding-right: 1em;
  max-width: 50em;
  margin: 0 auto;
  box-shadow: 0 0 5em -1em #ccc;

  @media(max-width: 600px) {
    & {
      font-size: 18px;
      padding-left: .5em;
      padding-right: .5em;
    }
  }
`;

const defaultTitle = 'drhayes.io';

const Layout = ({ children, title }) => (
  <React.Fragment>
    <Head>
      <html lang="en" />
      <title>
        {title ? `${title} · drhayes.io` : 'drhayes.io'}
      </title>
      <link href="https://fonts.googleapis.com/css?family=Fira+Mono" rel="stylesheet"></link>
    </Head>

    <Container>

      <Nav />

      {children}

      <footer className="main-footer">
        <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">
          <img alt="Creative Commons License" style={{ borderWidth:0 }} src="https://i.creativecommons.org/l/by-sa/4.0/80x15.png" />
        </a>
          This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a> by David R. Hayes.
      </footer>

    </Container>
  </React.Fragment>
);

/*
*/

export default Layout
