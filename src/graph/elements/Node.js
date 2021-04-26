import React from 'react';

const fontSize = 10;
const radius = 7;

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
          fill={node.center ? `pink` : `lightblue`}
          // stroke={node.center ? `red` : `blue`}
          r={sizes.radius}
          onClick={(e) => console.log(node.name)}
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