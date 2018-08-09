import React from 'react';

const MainList = ({ children }) => {
  const listItems = React.Children.map(children, c => (
    <li style={{
      marginLeft: '1em'
    }}>
      {c}
    </li>
    )
  );
  return (
    <ul style={{
      marginBottom: '3em'
    }}>
      {listItems}
    </ul>
  );
}

export default MainList;
