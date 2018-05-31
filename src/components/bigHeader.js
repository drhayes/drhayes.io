import React from 'react';

const BigHeader = ({ children }) => (
  <h1 style={{
    fontFamily: ['league-gothic-1', 'Georgia', 'serif'],
    color: 'steelblue',
    marginTop: '1em',
    letterSpacing: '0.05em',
    marginBottom: '1em',
  }}>
    {children}
  </h1>
)

export default BigHeader
