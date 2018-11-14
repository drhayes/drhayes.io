import React from 'react';
import { Link } from 'gatsby';

const BlogLink = ({ blog }) => (
  <Link to={blog.fields.slug}>{blog.frontmatter.title}</Link>
);

export default BlogLink;
