import React, { useState } from 'react';

import NetworkGraph from './graph/NetworkGraph';
import TrendGraph from './graph/TrendGraph';
import Navigation from './navigation/Navigator';
import TagInfo from './grid/TagInfo';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

function App() {

  const useStyles = makeStyles((theme) => ({
    root: {
      height: "100vh"
    },
    grid: {
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
      <Grid item className={classes.grid} xs={4}>
        <TagInfo tagName="python" />
        <TrendGraph tag="python" />
      </Grid>
      <Grid item className={classes.grid} xs={5}>
        <NetworkGraph center="razor"/>
      </Grid>
    </Grid>
    // </div>
  );
}

export default App;
