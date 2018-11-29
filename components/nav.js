import React from 'react';
import NavImage from './navImage';
import styled from '@emotion/styled';
import Link from 'next/link'
import { css, jsx } from '@emotion/core';

const active = css`
  border-bottom: 1px solid rgba(61, 113, 156, 0.5);
`;

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
        <Link href="/" activeClassName={active}>drhayes.io</Link>
      </NavItem>
      <NavItem>
        <Link href="/games/gemini-rising" activeClassName={active}>Gemini Rising</Link>
      </NavItem>
      <NavItem>
        <Link href="/games/blaster" activeClassName={active}>Blaster</Link>
      </NavItem>
      <NavItem>
        <Link href="/about" activeClassName={active}>About</Link>
      </NavItem>
    </NavItems>
  </Nav>
);
