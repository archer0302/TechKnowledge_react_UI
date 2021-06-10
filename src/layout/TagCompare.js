import React from 'react';
import Network from '../graph/NetWorkFIAB';
import TrendGraph from '../graph/TrendGraph';
import TagInfo from '../grid/TagInfo';
// import TopQuestions from '../grid/TopQuestions';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from "react-router-dom";
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

  let { tags } = useParams();
  tags = tags.split(',');

  let nodesData = [];
  let linkData = [];
  const colors = d3.schemeCategory10;

  tags.forEach((tag, i) => {
    let relation = fetchRelation(tag, true, i);
    relation.nodes.forEach(n => n.color = colors[i]);
    relation.nodes.forEach(n => {
      // prevent duplicated nodes
      if (!nodesData.some(d => d.name === n.name)) {
        nodesData.push({...n, group: i});
      // If this is the main node, use the color of the cluster
      } else if (n.name === tag) {
        const index = nodesData.findIndex(e => e.name === tag);
        nodesData[index] = n;
      }
    });
    // nodesData = nodesData.concat(relation.nodes);
    relation.links.forEach(n => {
      n.color = colors[i];
      if (tags.includes(n.source) && tags.includes(n.target)) {
        n.distance = 300;
      } else {
        n.distance = 100;
      }
      n.source = nodesData.findIndex(d => d.name == n.source);
      n.target = nodesData.findIndex(d => d.name == n.target);
    });
    linkData = linkData.concat(relation.links);
  });

  tags.forEach((tag) => {
    const index = nodesData.findIndex(e => e.name === tag);
    nodesData[index] = {...nodesData[index], center: true, size: 10};  
  });

  return (
    <Grid
      className={classes.root}
      container
      justify="left"
      spacing={2}
      xs={12}
    >
      <Grid item xs={12}>
        <Grid container 
          spacing={4} 
          justify='left'
          alignItems='stretch'
        >
          <Grid xs={6} item>
            <TagInfo tagName={tags[0]}/>
          </Grid>
          <Grid xs={6} item>
            <TagInfo tagName={tags[1]}/>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container 
          spacing={6} 
          justify='left'
          alignItems='stretch'
        >
          <Grid item xs={6}>
            <h4>Asking Trend on StackOverflow</h4>
            <TrendGraph height={350} tags={tags}/>
          </Grid>
          <Grid item xs={6}>
            <Card>
              <Network nodesData={nodesData} linkData={linkData} width={400} height={400}/>
            </Card>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        Comparison
      </Grid>
    </Grid>
  )
} 