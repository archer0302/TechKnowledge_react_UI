import React from 'react';
import NetworkGraph from '../graph/NetworkGraph';
import TrendGraph from '../graph/TrendGraph';
import TagInfo from '../grid/TagInfo';
import TopQuestions from '../grid/TopQuestions';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

export default function TagWiki({ tag }) {

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
          direction="row"
          justify="left"
          alignItems="stretch"
          spacing={2}
          xs={12}
        >
      <Grid item xs={5}>
        <Grid container spacing={4} justify='left'>
          <Grid item>
            <TagInfo tagName={tag}/>
          </Grid>
          <Grid item>
            <TrendGraph tag={tag}/>
          </Grid>
          <Grid item xs={12}>
            <TopQuestions tagName={tag}/>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Grid container spacing={1} alignItems='stretch' className={classes.knowledgeGraph}>
          <Grid item xs={12}>
            <NetworkGraph center={tag}/>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
} 