import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';

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
      <Tag key={tag}>
        <Link href={`/tags/${tag}`}>
          <a>{tag}</a>
        </Link>
      </Tag>
    ))}
  </TagList>
);

export default FormattedDate
