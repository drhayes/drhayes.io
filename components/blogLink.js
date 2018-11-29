import React from 'react';
import Link from 'next/link';

const BlogLink = ({ blog }) => (
  <Link href={blog.fields.slug}>{blog.frontmatter.title}</Link>
);

export default BlogLink;
