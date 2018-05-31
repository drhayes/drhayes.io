import React from 'react'
import '../pages/prism.css';
import BigHeader from '../components/bigHeader';
import MainHeader from '../components/mainHeader';
import GrayAndSmall from '../components/grayAndSmall';

import './gamePost.css';

export default function GamePost({ data }) {
  const { html, frontmatter: { title, game, date } } = data.markdownRemark;
  const casedGame = game.replace(/(\b[a-z](?!\s))/g, d => d.toUpperCase());
  return (
    <div>
      <MainHeader />
      <BigHeader>
        {title} - {casedGame}
        <GrayAndSmall>{date}</GrayAndSmall>
      </BigHeader>
      <div dangerouslySetInnerHTML={{__html: html}}></div>
    </div>
  );
}

export const pageQuery = graphql`
query GamePostByPath($absolutePath: String!) {
  markdownRemark(fileAbsolutePath: {eq: $absolutePath}) {
    fileAbsolutePath
    html
    frontmatter {
      date(formatString: "MMMM DD, YYYY")
      title
      game
    }
  }
}
`;
