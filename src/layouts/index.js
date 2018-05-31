import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import MainContainer from '../components/mainContainer';
import './index.css'

const Layout = ({ children, data }) => (
  <div>
    <Helmet>
      <title>{data.site.siteMetadata.title}</title>
      <link rel="stylesheet" href="https://use.typekit.net/ctu8ime.css" />
    </Helmet>
    <MainContainer>
      {children()}
    </MainContainer>
  </div>
)

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
