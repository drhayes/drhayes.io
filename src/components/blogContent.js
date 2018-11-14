import React from 'react';

const BlogContent = ({ content }) => (
  <div dangerouslySetInnerHTML={{
      __html: content
  }} />
);

export default BlogContent;
