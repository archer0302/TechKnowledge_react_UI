import React from 'react';

const Line = ({ ...restProps }) => {
  return (
    <line
      {...restProps}
      stroke='blue'
    />
  )
};

export default Line;