import React from 'react'

const MainContainer = ({ children }) => (
  <div
    style={{
      fontFamily: ['Roboto', 'sans-serif'],
      margin: '1em auto',
      width: '40em',
      lineHeight: 1.2
    }}
  >
    { children }
  </div>
)

export default MainContainer
