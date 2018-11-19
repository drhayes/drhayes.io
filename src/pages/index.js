import React from 'react';
import Helmet from 'react-helmet';
import Layout from '../components/layout';
import styled from 'react-emotion';
import { StaticQuery, graphql } from 'gatsby';
import FormattedDate from '../components/formattedDate';
import dayjs from 'dayjs';
import BlogLink from '../components/blogLink';

const Section = styled('section')`
  margin-top: 2em;
`;

const FrontPageSection = ({ title, children }) => (
  <Section>
    <h4>{title}</h4>
    {children}
  </Section>
);

const MeLinks = styled('ul')`
  list-style: none;
  padding-left: 1em;
`;

const MeLink = ({ title, url }) => (
  <li>
    <a href={url}>{title}</a>
  </li>
);

const NoNumberList = styled('ol')`
  padding-left: 1em;
  list-style-type: none;
`;

const ListOfBlogPosts = () => (
  <StaticQuery
    query={graphql`
      query {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { fields: { blogPost: { eq: true } } }
          limit: 10
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                title
                date(formatString: "MMMM DD, YYYY")
                tags
              }
              excerpt
            }
          }
        }
      }
    `}
    render={data => {
      return (
        <NoNumberList>
          {data.allMarkdownRemark.edges
            .map(({ node }) => (
              <li key={node.id}>
                <FormattedDate date={dayjs(new Date(node.frontmatter.date))} /> » <BlogLink blog={node} />
              </li>
            ))
          }
        </NoNumberList>
      );
    }}
  />
);

const IndexPage = (data) => (
  <React.Fragment>
    <Layout data={data}>
      <FrontPageSection title="Blog">
        <ListOfBlogPosts />
      </FrontPageSection>

      <FrontPageSection title="Me Elsewhere">
        <MeLinks>
          <MeLink title="drhayes@mastodon.technology" url="https://mastodon.technology/@drhayes" />
          <MeLink title="Keybase" url="https://keybase.io/drhayes" />
          <MeLink title="GitHub" url="https://github.com/drhayes" />
          <MeLink title="Tumblr" url="https://drhayes.tumblr.com" />
          <MeLink title="Goodreads" url="https://www.goodreads.com/drhayes" />
        </MeLinks>
      </FrontPageSection>
    </Layout>
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "http://schema.org",
        "@type": "Person",
        "name": "David Hayes",
        "url": "https://drhayes.io",
        "sameAs": [
          "https://plus.google.com/u/0/102508315195752885470",
          "https://drhayes.tumblr.com/",
          "https://soundcloud.com/drhayes",
          "https://mastodon.technology/@drhayes",
          "https://www.linkedin.com/in/drhayes/",
          "https://twitter.com/drhayes"
        ]
      })}
    </script>
    <Helmet>
      <title>David Hayes</title>
      <meta name="google-site-verification" content="blpqoyJP6QdBNmkuqzE0LkXaRBHOgZa1cILyoCNFRAw" />
    </Helmet>
  </React.Fragment>
);

export default IndexPage;
