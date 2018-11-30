import React from 'react';
import Link from 'next/link';

const BlogLink = ({ blog }) => (
  <Link href={blog.slug}>
    <a>{blog.frontmatter.title}</a>
  </Link>
);

export default BlogLink;
