import React from 'react';

const MediumHeader = ({ children }) => (
  <h2 style={{
    color: 'steelblue',
    fontFamily: 'Roboto',
    fontSize: '150%',
    marginBottom: '.5em',
  }}>
    {children}
  </h2>
)

export default MediumHeader;
