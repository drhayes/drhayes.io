import React from 'react';
import Link from 'gatsby-link';

const MenuItem = ({ children }) => (
  <li style={{
    display: 'inline-block',
    marginRight: '3em'
  }}>
    {children}
  </li>
)

const MainHeader = () => (
  <ul style={{
    display: 'inline-block',
    margin: 0,
    listStyleType: 'none'
  }}>
    <MenuItem>
      <Link to="/">
        drhayes.io
      </Link>
    </MenuItem>
    <MenuItem>
      <Link to="/about">
        About
      </Link>
    </MenuItem>
  </ul>
);

export default MainHeader;
