import React from 'react';

const BigHeader = ({ children }) => (
  <h1 style={{
    color: 'steelblue',
    fontFamily: 'Oswald',
    fontSize: '200%',
    marginBottom: '1em',
  }}>
    {children}
  </h1>
)

export default BigHeader
