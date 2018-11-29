import React from 'react';
import Layout from '../components/layout';
import styled from '@emotion/styled';
import FormattedDate from '../components/formattedDate';
import dayjs from 'dayjs';
import BlogLink from '../components/blogLink';
import Head from 'next/head';

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

const ListOfBlogPosts = ({ posts = [] }) => (
  <NoNumberList>
    {posts
      .map(({ node }) => (
        <li key={node.id}>
          <FormattedDate date={dayjs(new Date(node.frontmatter.date))} /> » <BlogLink blog={node} />
        </li>
      ))
    }
  </NoNumberList>
);

const IndexPage = (data) => (
  <React.Fragment>
    <Head>
      <title key="title">David Hayes · drhayes.io</title>
      <meta name="google-site-verification" content="blpqoyJP6QdBNmkuqzE0LkXaRBHOgZa1cILyoCNFRAw" />
    </Head>

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
  </React.Fragment>
);

export default IndexPage;
