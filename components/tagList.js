import React from 'react';
import styled from 'react-emotion';
import { Link } from "gatsby"

const TagList = styled('ul')`
  display: inline-block;
  padding: 0;
  margin: 0;
  list-style-type: none;
`;

const Tag = styled('li')`
  display: inline-block;

  & + li::before {
    content: ' · ';
    white-space: pre;
  }
`;

const FormattedDate = ({ tags }) => (
  <TagList>
    {tags.map((tag, i) => (
      <Tag key={i}>
        <Link to={`/tags/${tag}`}>
          {tag}
        </Link>
      </Tag>
    ))}
  </TagList>
);

export default FormattedDate
