import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Nav from './nav';
import styled from 'react-emotion';

import './layout.css'
import './prism-ghcolors.css';

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

const Layout = ({ children, data : topLevelData }) => (
  // <link rel="canonical" href={`${data.site.siteMetadata.hostPrefix}${topLevelData.location.pathname}`} />
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            hostPrefix
          }
        }
      }
    `}
    render={data => (
      <React.Fragment>
        <Helmet titleTemplate={`%s · ${data.site.siteMetadata.title}`}>
          <html lang="en" />

        </Helmet>
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
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
