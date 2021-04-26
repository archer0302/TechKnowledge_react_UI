import React, { useState } from 'react';
import Graph from 'react-graph-network';

import Line from './elements/Line';
import Node from './elements/Node';
import Card from '@material-ui/core/Card';
import fetchRelation from '../data/RelationJson';

function NetworkGraph({center}) {

  const [opened, setOpened] = useState(false);
  const openDrawer = () => setOpened(true);

  const [props, setProps] = useState({
    nodeDistance: 5,
    zoomDepth: 3,
    hoverOpacity: .3,
    enableDrag: true,
    pullIn: true,
  });


  const data = fetchRelation(center);

  return (
    <Card style={{height: '100%'}}>
      <Graph
        data={data}
        NodeComponent={Node}
        LineComponent={Line}
        {...props}
      />
    </Card>
  );
}

export default NetworkGraph;
