import React from 'react';

const BigHeader = ({ children }) => (
  <h1 style={{
    fontFamily: ['Roboto', 'serif'],
    color: 'steelblue',
    marginTop: '1em',
    marginBottom: '1em',
  }}>
    {children}
  </h1>
);

export default BigHeader;
