import React from 'react';
import NavImage from './navImage';
import styled from 'react-emotion';

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
        <a href="/">drhayes.io</a>
      </NavItem>
      <NavItem>
        <a href="/">Gemini Rising</a>
      </NavItem>
      <NavItem>
        <a href="/">Blaster</a>
      </NavItem>
      <NavItem>
        <a href="/">About</a>
      </NavItem>
    </NavItems>
  </Nav>
);
