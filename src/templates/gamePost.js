import React from 'react'
import '../pages/prism.css';
import BigHeader from '../components/bigHeader';

import './gamePost.css';

export default function GamePost({ data }) {
  const { html, frontmatter: { title } } = data.markdownRemark;
  return (
    <div>
      <BigHeader>{title}</BigHeader>
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
    }
  }
}
`;
