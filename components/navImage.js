import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';

const Image = styled('img')`
  width: 80px;
  box-shadow: none;
  vertical-align: middle;
`;

const NavImage = () => (
  <Link href="/">
    <a>
      <Image src="/static/raven.png" />
    </a>
  </Link>
);

export default NavImage;
