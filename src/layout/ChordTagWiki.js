import React from 'react';
import ChordGraph from '../graph/ChordGraph';
import TrendGraph from '../graph/TrendGraph';
import TagInfo from '../grid/TagInfo';
import TopQuestions from '../grid/TopQuestions';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from "react-router-dom";
import { fetchSingleRelation } from '../data/RelationJson';
import { Card } from '@material-ui/core';

export default function ChordTagWiki() {

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
  console.log(relation);
  
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
            <ChordGraph tag={tag}/>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  )
} 