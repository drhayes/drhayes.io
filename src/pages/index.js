import React from 'react';
import Link from 'gatsby-link';
import Header from '../components/header';

const BigHeader = ({ children }) => (
  <h1 style={{
    fontFamily: 'Oswald',
    fontSize: '200%',
    marginBottom: '1em'
  }}>
    {children}
  </h1>
)

const GrayAndSmall = ({ children }) => (
  <small style={{
    display: 'block',
    fontSize: '50%',
    fontWeight: 'normal',
    fontFamily: 'Roboto',
    color: '#777',
    marginTop: '.5em'
  }}>
    {children}
  </small>
)

const MediumHeader = ({ children }) => (
  <h2 style={{
    fontFamily: 'Oswald',
    fontSize: '115%',
    marginBottom: '2em'
  }}>
    {children}
  </h2>
)

const IndexPage = ({ data }) => (
  <div>
    <BigHeader>
      drhayes.io
      <GrayAndSmall>The personal website of David R. Hayes </GrayAndSmall>
    </BigHeader>
    <MediumHeader>Here</MediumHeader>
    <MediumHeader>Elsewhere</MediumHeader>
    <ul>

    </ul>
  </div>
)

export default IndexPage

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          excerpt
        }
      }
    }
  }
`;
