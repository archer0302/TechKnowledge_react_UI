import React from 'react';

const Line = ({ link, ...restProps }) => {
  return (
    <line
      {...restProps}
      stroke={link.stroke}
    />
  )
};

export default Line;