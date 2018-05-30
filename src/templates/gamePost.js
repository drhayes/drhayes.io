import React from 'react'
import Container from '../components/container';
import '../pages/prism.css';
import BigHeader from '../components/bigHeader';

export default function GamePost({ data }) {
  const { html, frontmatter: { title } } = data.markdownRemark;
  return (
    <Container>
      <BigHeader>{title} - drhayes.io</BigHeader>
      <div dangerouslySetInnerHTML={{__html: html}}></div>
    </Container>
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
