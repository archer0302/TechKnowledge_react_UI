import React from 'react';
import Network from '../graph/NetWork';
import TrendGraph from '../graph/TrendGraph';
import TagInfo from '../grid/TagInfo';
// import TopQuestions from '../grid/TopQuestions';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
// import { useParams } from "react-router-dom";
import { fetchRelation } from '../data/RelationJson';
import * as d3 from 'd3';

export default function TagCompare() {

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex'
    },
    knowledgeGraph: {
      height: '600px'
    }
  }));

  const classes = useStyles();

  const compare = [
    'python',
    'c#'
  ];

  let nodesData = [];
  let linkData = [];
  const colors = d3.schemeCategory10;

  compare.forEach((tag, i) => {
    let relation = fetchRelation(tag, true);
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
      if (compare.includes(n.source) && compare.includes(n.target)) {
        n.distance = 300;
      } else {
        n.distance = 100;
      }
    });
    linkData = linkData.concat(relation.links);
  });

  return (
    <Grid
      className={classes.root}
      container
      justify="left"
      spacing={2}
      xs={12}
    >
      <Grid item xs={6}>
        <Grid container spacing={4} justify='left'>
          <Grid item>
            <TagInfo tagName={"c#"}/>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={6}>
        <Grid container spacing={4} justify='left'>
          <Grid item>
            <TagInfo tagName={"python"}/>
          </Grid>
        </Grid>
      </Grid>
      

      <Grid item xs={5}>
        <Grid item>
            <TrendGraph width={500} height={400} tag={["c#", "python"]}/>
        </Grid>
      </Grid>

      <Grid xs={1}/>
      <Grid item xs={6}>
        <Grid container spacing={1} alignItems='stretch' className={classes.knowledgeGraph}>
          <Grid item xs={12}>
            <Network nodesData={nodesData} linkData={linkData} width={700} height={490}/>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        Comparison
      </Grid>
    </Grid>
  )
} 