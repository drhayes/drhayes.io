import React from 'react';
import Link from 'gatsby-link';
import BigHeader from '../components/bigHeader';

const GrayAndSmall = ({ children }) => (
  <small style={{
    display: 'block',
    fontSize: '50%',
    fontWeight: 'normal',
    fontFamily: 'Lato',
    color: 'darkslategray',
  }}>
    {children}
  </small>
)

const MediumHeader = ({ children }) => (
  <h2 style={{
    color: 'steelblue',
    fontFamily: 'Oswald',
    fontSize: '150%',
    marginBottom: '.5em',
  }}>
    {children}
  </h2>
)

const List = ({ children }) => {
  const listItems = React.Children.map(children, c => (
    <li style={{
      marginLeft: '1em'
    }}>
      {c}
    </li>
    )
  );
  return (
    <ul style={{
      marginBottom: '3em'
    }}>
      {listItems}
    </ul>
  );
}

const IndexPage = ({ data }) => (
  <div>
    <BigHeader>
      drhayes.io
      <GrayAndSmall>The personal website of David R. Hayes </GrayAndSmall>
    </BigHeader>
    <MediumHeader>Here</MediumHeader>
    <List>
      <Link to="/games/blaster">Blaster</Link>
      <Link to="/impactjs">ImpactJS</Link>
    </List>

    <MediumHeader>Elsewhere</MediumHeader>
    <List>
      <a href="https://micro.blog/drhayes" rel="me">My Micro.blog</a>
      <a href="https://keybase.io/drhayes" rel="me">Keybase</a>
      <a href="https://github.com/drhayes">GitHub</a>
      <a href="https://drhayes.tumblr.com">Tumblr</a>
      <a href="https://www.goodreads.com/drhayes">Goodreads</a>
      <a href="https://twitter.com/drhayes">@drhayes</a>
    </List>

    <Link to="/about">About</Link>
  </div>
)

export default IndexPage

