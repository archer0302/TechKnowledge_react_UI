import React from 'react';

const Line = ({ link, ...restProps }) => {
  return (
    <line
      {...restProps}
      stroke={link.stroke}
      distance={link.distance}
    />
  )
};

export default Line;