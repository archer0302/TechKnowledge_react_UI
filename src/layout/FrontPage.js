import React from 'react';
import NetWork from '../graph/NetWork';
import { fetchRelation } from '../data/RelationJson';
import * as d3 from 'd3';

export default function FrontPage() {

  const top10 = ['javascript',
    'java',
    'python',
    'c#',
    'php',
    'c++',
    'ruby',
    'sql'
  ];

  let nodesData = [];
  let linkData = [];
  const colors = d3.schemeCategory10;

  top10.forEach((tag, i) => {
    let relation = fetchRelation(tag, true, i);
    relation.nodes.forEach(n => n.color = colors[i]);
    relation.nodes.forEach(n => {
      // prevent duplicated nodes
      if (!nodesData.some(d => d.name === n.name)) {
        nodesData.push(n);
      // If this is the main node, use the color of the cluster
      } else if (n.name === tag) {
        const index = nodesData.findIndex(e => e.name === tag);
        nodesData[index] = n;
      }
    })
    // nodesData = nodesData.concat(relation.nodes);
    relation.links.forEach(n => {
      n.color = colors[i];
      if (top10.includes(n.source) && top10.includes(n.target)) {
        n.distance = 300;
      } else {
        n.distance = 100;
      }
    });
    linkData = linkData.concat(relation.links);
  });

  return (
    <div>
      <div style={{alignItems: 'center', display:'flex', flexDirection: 'column'}}>
        <NetWork nodesData={nodesData} linkData={linkData} width={1500} height={900} forceXY={[0.005, 0.035]}/>
      </div>
    </div>
  )
}