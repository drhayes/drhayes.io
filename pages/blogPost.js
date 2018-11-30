import React from 'react';

const BlogPost = (props) => (
  <pre>{JSON.stringify(props, null, 2)}</pre>
);

export default BlogPost;
