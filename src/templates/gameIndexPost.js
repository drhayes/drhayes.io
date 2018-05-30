import React from 'react'
import '../pages/prism.css';
import BigHeader from '../components/bigHeader';
import Link from 'gatsby-link';

import './gamePost.css';

export default function GameIndexPost({ data }) {
  const { html, frontmatter: { title } } = data.markdownRemark;
  const articles = data.allMarkdownRemark.edges
    .map(({ node }) => ({
      id: node.id,
      title: node.frontmatter.title,
      path: node.fields.path
    }));
  const articleElems = articles
    .map(article => (
      <li key={article.id}>
        <Link to={article.path}>{article.title}</Link>
      </li>
    ))
  return (
    <div>
      <BigHeader>{title}</BigHeader>
      <div dangerouslySetInnerHTML={{__html: html}}></div>
      <h2>Articles</h2>
      <ol>
        {articleElems}
      </ol>
    </div>
  );
}

export const pageQuery = graphql`
query GameIndexPostByPath($absolutePath: String!, $game: String!) {
  markdownRemark(fileAbsolutePath: {eq: $absolutePath}) {
    fileAbsolutePath
    html
    frontmatter {
      date(formatString: "MMMM DD, YYYY")
      title
    }
  }
  allMarkdownRemark(
    filter: {frontmatter: {game: {eq: $game}}, id: {regex: "/^((?!index).)*$/"}},
    sort: {fields: [frontmatter___date], order: ASC}
  ) {
    edges {
      node {
        id
        fields {
          path
        }
        frontmatter {
          title
          date
        }
      }
    }
  }
}
`;
