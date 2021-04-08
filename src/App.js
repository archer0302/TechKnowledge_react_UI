import React, { useState } from 'react';
import Graph from 'react-graph-network';

import Line from './elements/Line';
import Node from './elements/Node';
import logo from './logo.svg';
// import './App.css';
import relation from './data/RelationJson';

function App() {

  const [opened, setOpened] = useState(false);
  const openDrawer = () => setOpened(true);

  const [props, setProps] = useState({
    nodeDistance: 500,
    zoomDepth: 3,
    hoverOpacity: .3,
    enableDrag: true,
    pullIn: false,
  });
  const handlePropsChange = ({ name, value }) => {
    setProps({ ...props, [name]: value })
  };

  return (
    <div style={{ height: '100vh' }}>
      <Graph
        data={{
          "nodes": [
            {
              "id": 1,
              "name": "Java"
            },
            {
              "id": 2,
              "name": "Spring-mvc"
            },
            {
              "id": 3,
              "name": "Python"
            }
          ],
          "links": [
            {
              "source": 1,
              "target": 2,
              "l": 1.5,
              "typ": 1,
            }
          ]
        }}
        NodeComponent={Node}
        LineComponent={Line}
        {...props}
      />
    </div>
  );
}

export default App;
