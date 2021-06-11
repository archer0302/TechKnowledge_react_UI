import React, { useState } from 'react';
import NetWork from '../graph/NetWorkFIAB';
import { fetchRelation } from '../data/Relation';
import * as d3 from 'd3';
import { Button, Typography } from '@material-ui/core';
import top100Tag from '../data/top100_tag.json';
import { Redirect } from "react-router-dom";
import { TagCloud } from 'react-tagcloud';
import { makeStyles } from '@material-ui/core/styles';


export default function FrontPage() {
  const [random, setRandom] = useState([]);

  const useStyles = makeStyles((theme) => ({
    frontPageTitle: {
      alignItems: 'center', 
      display:'flex', 
      flexDirection: 'column'
    },
    frontPageText: {
      width: '1000px', 
      textAlign: 'center', 
      lineHeight: '1.8', 
      fontSize: '16px'
    }
  }));

  const classes = useStyles();

  const top10 = ['javascript',
    'java',
    'python',
    'c#',
    'php',
    'c++',
    'ruby',
    'sql'
  ];

  const cloud_data = [
    { value: 'jQuery vs Reactjs', count: 25, props: { style: { paddingLeft: '30px'} } },
    { value: 'MongoDB vs sql', count: 18 },
    { value: 'JavaScript vs Python', count: 38 },
    { value: 'npm vs yarn', count: 28 },
    { value: 'Express.js vs nodejs', count: 25 },
    { value: 'HTML5 vs HTML', count: 33 },
    { value: 'CSS3 vs SCSS', count: 20 },
    { value: 'Babel.js', count: 7 },
    { value: 'ECMAScript vs Typescript', count: 25 },
    { value: 'Jest', count: 15 },
    { value: 'Mocha', count: 17 },
    { value: 'React Native', count: 27 },
    { value: 'Angular.js', count: 30 },
    { value: 'TypeScript', count: 15 },
    { value: 'Flow', count: 30 },
    { value: 'NPM', count: 11 },
  ]

  const color_options = {
    luminosity: 'dark',
  }

  let nodesData = [];
  let linkData = [];
  const colors = d3.schemeCategory10;

  top10.forEach((tag, i) => {
    let relation = fetchRelation(tag, true, i);
    relation.nodes.forEach(n => n.color = colors[i]);
    relation.nodes.forEach(n => {
      // prevent duplicated nodes
      if (!nodesData.some(d => d.name === n.name)) {
        nodesData.push({...n, size: 6, group: i});
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
        n.distance = 500;
      } else {
        n.distance = 100;
      }
      n.source = nodesData.findIndex(d => d.name === n.source);
      n.target = nodesData.findIndex(d => d.name === n.target);
    });
    linkData = linkData.concat(relation.links);
  });

  console.log(linkData);
  
  top10.forEach((tag) => {
    const index = nodesData.findIndex(e => e.name === tag);
    nodesData[index] = {...nodesData[index], center: true, size: 10};  
  });

  return (
    <div>
      <div className={classes.frontPageTitle}>
        <div className={classes.frontPageText}>
          <Typography variant="h2">Techknowledge</Typography><br/>
          <Typography variant="h6">The place to explore indepth knowledge of Technology.</Typography><br/>
          <Typography variant="body">
            We applied several data mining methods to explore the trend and relationship between tags on StakOverflow.com 
            and also process NLP to the corpus on StakOverflow.com to provide technology comparison in <a href='#TechCompare'>TechCompare</a>.
            From this website, you can find the visualized result and the knowledge that we found.
          </Typography>
          <div style={{ paddingBottom: '40px' }}><br/>
            Don't know where to start? Search in the searchbar on top or try <br/><br/>
            <Button variant="contained" color="secondary" onClick={() => setRandom(top100Tag[Math.floor(Math.random() * top100Tag.length)])}>Random tag</Button>
            {random.length !== 0 ? <Redirect to={"/TagWiki/" + encodeURI(random)} /> : ''}
          </div>
        </div>
        <NetWork nodesData={nodesData} linkData={linkData} width={1000} height={800} 
          forceXY={[0.01, 0.03]} iter={5} nodeStrength={-50}/>
        
        <div className={classes.frontPageText}>
          <Typography variant="h3" id='TechCompare'>TechCompare</Typography><br/>
          <Typography variant="h6">Comparison between technologies.</Typography><br/>
          <Typography variant="body">
            We applied several data mining methods to explore the trend and relationship between tags on StakOverflow.com 
            and also process NLP to the corpus on StakOverflow.com to provide technology comparison (#TechCompare).
            From this website, you can find the visualized result and the knowledge that we found.
          </Typography>
        </div>
        <TagCloud
          minSize={15}
          maxSize={60}
          tags={cloud_data}
          className="simple-cloud"
          colorOptions={color_options}
          style={{ textAlign: 'center' }}
          onClick={tag => alert(`'${tag.value}' was selected!`)}
        />
      </div>
    </div>
  )
}