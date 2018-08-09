import React from 'react';
import Link from 'gatsby-link';
import BigHeader from '../components/bigHeader';
import GrayAndSmall from '../components/grayAndSmall';
import MainList from '../components/mainList';
import MediumHeader from '../components/mediumHeader';

// .tk-proxima-nova

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
    <MainList>
      <a href="https://mastodon.technology/@drhayes" rel="me>@drhayes@mastodon.technology</a>
      <a href="https://keybase.io/drhayes" rel="me">Keybase</a>
      <a href="https://github.com/drhayes">GitHub</a>
      <a href="https://drhayes.tumblr.com">Tumblr</a>
      <a href="https://www.goodreads.com/drhayes">Goodreads</a>
    </MainList>

    <Link to="/about">About</Link>
  </div>
)

export default IndexPage

