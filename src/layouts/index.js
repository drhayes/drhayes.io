import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import MainContainer from '../components/mainContainer';
import './index.css'

const Layout = ({ children, data }) => (
  <div>
    <Helmet>
      <title>{data.site.siteMetadata.title}</title>
      <link href="https://fonts.googleapis.com/css?family=Oswald|Roboto" rel="stylesheet" />
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
  query SiteTitleQuery2 {
    site {
      siteMetadata {
        title
      }
    }
  }
`
