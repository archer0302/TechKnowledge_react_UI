import React from 'react';

const fontSize = 14;
const radius = 10;

const Node = ({ node }) => {

  // sizes
  const sizes = {
    radius: radius,
    textSize: fontSize,
    textX: radius * 1.5,
    textY: radius / 2,
  };

  return (
    <>
      <g style={{ fontSize: sizes.textSize + 'px' }}>
        <circle
          fill={`lightblue`}
          stroke={`blue`}
          r={sizes.radius}
        />
        <text
          x={sizes.radius + 7}
          y={sizes.radius / 2}
        >
          {node.name}
        </text>
      </g>
    </>
  );
};

export default Node;