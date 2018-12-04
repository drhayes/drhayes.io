import React from 'react';
import NavImage from './navImage';
import styled from '@emotion/styled';
import Link from 'next/link'
import { css, jsx } from '@emotion/core';

const Nav = styled('nav')`
  padding-top: 1em;
  padding-bottom: 1em;
  border-bottom: 1px solid #eee;
  width: 100%;
`;

const NavItems = styled('ul')`
  display: inline-block;
  list-style: none;
  margin-left: 1em;
  padding-left: 0;
  text-transform: lowercase;
`;

const NavItem = styled('li')`
  display: inline-block;

  & + li::before {
    content: ' · ';
    white-space: pre;
  }
`;

export default () => (
  <Nav>
    <NavImage />
    <NavItems>
      <NavItem>
        <Link prefetch href="/"><a>drhayes.io</a></Link>
      </NavItem>
      <NavItem>
        <Link prefetch href="/games/gemini-rising"><a>Gemini Rising</a></Link>
      </NavItem>
      <NavItem>
        <Link prefetch href="/games/blaster"><a>Blaster</a></Link>
      </NavItem>
      <NavItem>
        <Link prefetch href="/about"><a>About</a></Link>
      </NavItem>
    </NavItems>
  </Nav>
);
