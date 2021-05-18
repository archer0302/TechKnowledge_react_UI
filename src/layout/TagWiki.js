import React from 'react';
import Network from '../graph/NetWork';
import TrendGraph from '../graph/TrendGraph';
import TagInfo from '../grid/TagInfo';
import TopQuestions from '../grid/TopQuestions';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from "react-router-dom";
import { fetchSingleRelation } from '../data/RelationJson';
import { Card } from '@material-ui/core';

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

  const relation = fetchSingleRelation(tag, false);
  
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
      <Grid item xs={12}>
        <TagInfo tagName={tag}/>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Grid container direction='column' spacing={2}>
          <Grid item xs={12}>
            <h4>Asking Trend on StackOverflow</h4>
            <TrendGraph height={350} tags={[tag]}/>
          </Grid>
          <Grid item xs={12}>
            <TopQuestions tagName={tag}/>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Grid item xs={12}>
          <Card>
            <Network nodesData={relation.nodes} linkData={relation.links} 
              width={500} height={400} nodeStrength={-30} iter={1}
              centerForce={0.05}
            />
          </Card>
        </Grid>
      </Grid>
    </Grid>
  )
} 