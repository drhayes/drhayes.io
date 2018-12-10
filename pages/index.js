import React from 'react';
import Layout from '../components/layout';
import styled from '@emotion/styled';
import FormattedDate from '../components/formattedDate';
import dayjs from 'dayjs';
import BlogLink from '../components/blogLink';
import Head from 'next/head';
import { withRouter } from 'next/router'

const schemaOrgMe = {
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
};

const JsonLd = () =>
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgMe) }}
    />

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

  @media (max-width: 40em) {
    padding-left: 0;
  }
`;

const MeLink = ({ title, url }) => (
  <li>
    <a href={url}>{title}</a>
  </li>
);

const NoNumberList = styled('ol')`
  padding-left: 1em;
  list-style-type: none;

  @media (max-width: 40em) {
    padding-left: 0;
  }
`;

const ListOfBlogPosts = ({ posts }) => {
  posts.sort((a,b) => a.frontmatter.date < b.frontmatter.date);
  return (
    <NoNumberList>
      {posts
        .map(post => (
          <li key={post.frontmatter.date}>
            <FormattedDate date={dayjs(post.frontmatter.date)} /> » <BlogLink blog={post} />
          </li>
        ))
      }
    </NoNumberList>
  );
}

const FrontPage = ({ router }) => (
  <React.Fragment>
    <Head>
      <title key="title">David Hayes · drhayes.io</title>
      <meta name="google-site-verification" content="blpqoyJP6QdBNmkuqzE0LkXaRBHOgZa1cILyoCNFRAw" />
    </Head>

    <Layout>
      <FrontPageSection title="Blog">
        <ListOfBlogPosts posts={router.query.blogPosts} />
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

    <JsonLd />
  </React.Fragment>
);

export default withRouter(FrontPage);
