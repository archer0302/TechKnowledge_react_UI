import React, { useState } from 'react';

import NetworkGraph from './graph/NetworkGraph';
import TrendGraph from './graph/TrendGraph';
import TagInfo from './grid/TagInfo';
import TopQuestions from './grid/TopQuestions';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';



function App() {

  const drawerWidth = 240;

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex'
    },
    knowledgeGraph: {
      height: '600px'
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      background: '#BFD7ED',
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      background: '#003B73'
    },
    drawerContainer: {
      overflow: 'auto',
    }
  }));

  const classes = useStyles();

  const sections = [
    { title: 'Technology', url: '#' },
    { title: 'Technology', url: '#' }
  ]

  return (
    <div className={classes.root}>
      {/* Header */}
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            TechLand
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Menu drawer */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >

        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {['TechWiki', 'TechCompare'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>

      {/* Main content */}
      <main className={classes.content}>
        <Toolbar/>
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
                <TagInfo tagName="python"/>
              </Grid>
              <Grid item>
                <TrendGraph tag="python"/>
              </Grid>
              <Grid item xs={12}>
                <TopQuestions tagName="python"/>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={1} alignItems='stretch' className={classes.knowledgeGraph}>
              <Grid item xs={12}>
                <NetworkGraph center="python"/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </main>
    </div>
  );
}

export default App;
