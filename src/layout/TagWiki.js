import React from 'react';
import Network from '../graph/NetWork';
import TrendGraph from '../graph/TrendGraph';
// import TagInfo from '../grid/TagInfo';
// import TopQuestions from '../grid/TopQuestions';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from "react-router-dom";
import fetchRelation from '../data/RelationJson';
import * as d3 from 'd3';

export default function TagWiki() {

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex'
    },
    knowledgeGraph: {
      height: '600px'
    }
  }));

  const classes = useStyles();

  const { tag } = useParams();

  const relation = fetchRelation(tag, false);

  const colors = d3.schemeCategory10;

  relation.nodes.forEach(n => n.color = colors[0]);
  relation.links.forEach(n => n.color = colors[0]);

  return (
    <Grid
      className={classes.root}
      container
      direction="row"
      justify="left"
      alignItems="stretch"
      spacing={2}
      xs={12}
    >
      <Grid item xs={5}>
        <Grid container spacing={4} justify='left'>
          <Grid item>
            {/* <TagInfo tagName={tag}/> */}
          </Grid>
          <Grid item>
            <TrendGraph tag={[tag]}/>
          </Grid>
          <Grid item xs={12}>
            {/* <TopQuestions tagName={tag}/> */}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Grid container spacing={1} alignItems='stretch' className={classes.knowledgeGraph}>
          <Grid item xs={12}>
            <Network nodesData={relation.nodes} linkData={relation.links} width={700} height={560}/>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
} 