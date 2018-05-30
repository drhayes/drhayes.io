import React from 'react'
import BigHeader from '../components/bigHeader';
import MainHeader from '../components/mainHeader';

import './gamePost.css';

export default function MarkdownPage({ data }) {
  const { html, frontmatter: { title } } = data.markdownRemark;
  return (
    <div>
      <MainHeader />
      <BigHeader>{title}</BigHeader>
      <div dangerouslySetInnerHTML={{__html: html}}></div>
    </div>
  );
}

export const pageQuery = graphql`
query MarkdownPageByPath($absolutePath: String!) {
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
