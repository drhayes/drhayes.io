import React from 'react';
import FormattedDate from '../components/formattedDate';
import dayjs from 'dayjs';
import TagList from '../components/tagList';
import BlogLink from './blogLink';

const BlogTitleStuff = ({ post, isH1=true }) => {
  const title = post.frontmatter.title;
  const date = dayjs(post.frontmatter.date);
  const titleElem = isH1 ? <h1>{title}</h1> : <h2><BlogLink blog={post} /></h2>;
  const tagsElem = post.frontmatter.tags && (
    <div>
      <span style={{ opacity: 0.5}}>Tags: </span>
      <TagList tags={post.frontmatter.tags} />
    </div>
  );
  return (
    <React.Fragment>
      {titleElem}

      <div>
        <span style={{ opacity: 0.5 }}>Published: </span>
        <FormattedDate date={date} />
      </div>

      {tagsElem}
    </React.Fragment>
  );
};

export default BlogTitleStuff;
