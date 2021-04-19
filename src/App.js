import React, { useState } from 'react';

import NetworkGraph from './graph/NetworkGraph';
import TrendGraph from './graph/TrendGraph';
import Navigation from './navigation/Navigator';
import TagInfo from './grid/TagInfo';
import TopQuestions from './grid/TopQuestions';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

function App() {

  const useStyles = makeStyles((theme) => ({
    root: {
      height: "100vh"
    },
    parent: {
      padding: theme.spacing(2)
    },
    navi: {
      background: 'grey'
    }
  }));

  const classes = useStyles();

  return (
    // <div style={{ height: '100vh', display: 'flex' }}>
    <Grid
      className={classes.root}
      container
      direction="row"
      justify="flex-start"
      alignItems="stretch"
    >
      <Grid item xs={2} className={classes.navi}>
        <Navigation />
      </Grid>
      <Grid item className={classes.parent} xs={4}>
        <Grid container spacing={5}>
          <Grid item>
            <TagInfo tagName="python" />
          </Grid>
          <Grid item>
            <TrendGraph tag="python" />
          </Grid>
          <Grid item>
            <TopQuestions tagName="python" />
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={classes.parent} xs={6}>
        <NetworkGraph center="python"/>
      </Grid>
    </Grid>
    // </div>
  );
}

export default App;
