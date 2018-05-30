import React from 'react'

const MainContainer = ({ children }) => (
  <div
    style={{
      margin: '1em auto',
      padding: '1em',
      width: '40em',
      backgroundColor: 'white',
    }}
  >
    { children }
  </div>
)

export default MainContainer
