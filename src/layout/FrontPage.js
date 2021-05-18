import React, { useState } from 'react';
import NetWork from '../graph/NetWork';
import { fetchRelation } from '../data/RelationJson';
import * as d3 from 'd3';
import { Button, Typography } from '@material-ui/core';
import top100Tag from '../data/top100_tag.json';
import { Redirect } from "react-router-dom";


export default function FrontPage() {
  const [random, setRandom] = useState([]);

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
        <div style={{width: '800px'}}>
          <Typography variant="h2">Techknowledge</Typography>
          <Typography variant="h6">The place to explore indepth knowledge of Technology.</Typography>
          <Typography variant="body">
            We applied several data mining methods to explore the trend and relationship between tags on StakOverflow.com 
            and also process NLP to the corpus on StakOverflow.com to provide technology comparison (#TechCompare).
            From this website, you can find the visualized result and the knowledge that we found.
          </Typography>
        </div>
        <NetWork nodesData={nodesData} linkData={linkData} width={1200} height={800} forceXY={[0.005, 0.025]}/>
        Don't know where to start? Search in the searchbar on top or try 
        <Button color="primary" onClick={() => setRandom(top100Tag[Math.floor(Math.random() * top100Tag.length)])}>Random tag</Button>
        {random.length !== 0 ?
          <Redirect to={"/TagWiki/" + encodeURI(random)} /> : 
        ''}
      </div>
    </div>
  )
}