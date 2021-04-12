import React, { useState } from 'react';
import Graph from 'react-graph-network';

import Line from './elements/Line';
import Node from './elements/Node';
import fetchRelation from '../data/RelationJson';

function NetworkGraph({center}) {

  const [opened, setOpened] = useState(false);
  const openDrawer = () => setOpened(true);

  const [props, setProps] = useState({
    nodeDistance: 300,
    zoomDepth: 3,
    hoverOpacity: .3,
    enableDrag: true,
    pullIn: false,
  });

  const handlePropsChange = ({ name, value }) => {
    setProps({ ...props, [name]: value })
  };

  const data = fetchRelation(center);

  return (
    <Graph
      data={data}
      NodeComponent={Node}
      LineComponent={Line}
      {...props}
    />
  );
}

export default NetworkGraph;
