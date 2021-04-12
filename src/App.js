import React, { useState } from 'react';

import NetworkGraph from './graph/NetworkGraph';
import Navigation from './navigation/Navigator';
import TagInfo from './grid/TagInfo';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

function App() {

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    }
  }));

  const classes = useStyles();

  return (
    <div style={{ height: '100vh', display: 'flex' }}>
      <Navigation />
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <TagInfo tagName="Python" />
        <NetworkGraph center="razor" />
      </Grid>
    </div>
  );
}

export default App;
