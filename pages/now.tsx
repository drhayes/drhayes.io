import React from 'react';
import { NextPage } from 'next';
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import PageLayout from '../components/pageLayout';
import { bundleMDX } from 'mdx-bundler';
import { getMDXComponent } from 'mdx-bundler/client';

export default function Now({ code, frontmatter }) {
  const Component = getMDXComponent(code);

  return (
    <PageLayout title="Hello there" updated={new Date()}>
      <Component />
    </PageLayout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { code, frontmatter } = await bundleMDX('**what now?**');

  return {
    props: {
      code,
      frontmatter,
    },
  };
};
