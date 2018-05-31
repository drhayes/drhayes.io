import React from 'react';

const GrayAndSmall = ({ children }) => (
  <small style={{
    display: 'block',
    fontSize: '50%',
    fontWeight: 'normal',
    fontFamily: ['Raleway'],
    color: 'lightslategray',
    letterSpacing: 'initial'
  }}>
    {children}
  </small>
);

export default GrayAndSmall;
