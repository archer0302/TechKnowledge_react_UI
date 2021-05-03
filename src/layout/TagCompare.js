import React from 'react';
import Network from '../graph/NetWork';
import TrendGraph from '../graph/TrendGraph';
import TagInfo from '../grid/TagInfo';
import TopQuestions from '../grid/TopQuestions';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from "react-router-dom";
import fetchRelation from '../data/RelationJson';
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

  return (
    <Grid
      className={classes.root}
      container
      // direction="column"
      justify="left"
      // alignItems="stretch"
      spacing={2}
      xs={12}
    >
      <Grid item xs={5}>
        <Grid container spacing={4} justify='left'>
          <Grid item>
            <TagInfo tagName={"c#"}/>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={5}>
        <Grid container spacing={4} justify='left'>
          <Grid item>
            <TagInfo tagName={"python"}/>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={4}>
        <Grid item>
            <TrendGraph tag={["c#", "python"]}/>
        </Grid>
      </Grid>
    </Grid>
  )
} 