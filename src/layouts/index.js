import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

// Fonts.
import 'typeface-raleway';
import 'typeface-roboto';

import MainContainer from '../components/mainContainer';
import './index.css'

const Layout = ({ children, data }) => (
  <div>
    <Helmet>
      <title>{data.site.siteMetadata.title}</title>
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
