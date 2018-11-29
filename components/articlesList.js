import React from 'react';

export default () => (
  <ol>
    <li>Thing</li>
  </ol>
);
// import React from 'react';
// import { StaticQuery, graphql, Link } from 'gatsby';

// function renderArticleList(game) {
//   return function(data) {
//     const posts = data.allMarkdownRemark.edges;
//     const links = posts
//       .filter(({ node }) => node.fields.slug.includes(`${game}/articles`))
//       .map(({ node }) => (
//         <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
//       ));
//     return (
//       <ol>
//         {links.map((link, i) => <li key={i}>{link}</li>)}
//       </ol>
//     );
//   }
// }

// const query = graphql`
// {
//   allMarkdownRemark(
//     sort: { order: ASC, fields: [frontmatter___date] }
//     filter: { fields: { gamePost: { eq: true }}}
//   ) {
//     edges {
//       node {
//         fields {
//           slug
//         }
//         frontmatter {
//           title
//         }
//       }
//     }
//   }
// }`;

// const ArticlesList = ({ game }) => (
//   <StaticQuery
//     query={query}
//     render={renderArticleList(game)}
//   />
// );

// export default ArticlesList;
