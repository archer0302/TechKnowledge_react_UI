import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TagWiki from './layout/TagWiki';
import TagCompare from './layout/TagCompare';
import FrontPage from './layout/FrontPage';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from '@material-ui/core';
import SearchForm from './grid/SearchForm';



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
      background: '#212428',
      color: '#96958F',
      width: drawerWidth,
    },
    main: {
      height: '100vh',
      flexGrow: 1,
      padding: theme.spacing(3),
      background: '#e7e7e7',
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2)
      },
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      background: '#121212',
    },
    drawerContainer: {
      overflow: 'auto',
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    container: {
      alignItems: 'center'
    }
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Router>
        {/* Header */}
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant='h6' noWrap className={classes.title}>
              TechKnowledge
            </Typography>
            <SearchForm />
          </Toolbar>
        </AppBar>
        

        {/* Main content */}
        <main className={classes.main}>
          <Container maxWidth='lg' className={classes.container}>
            <Toolbar/>
            <Switch>
              <Route path='/TagCompare'>
                <TagCompare />
              </Route>
              <Route path='/TagWiki/:tag'>
                <TagWiki />
              </Route>
              <Route path='/'>
                <FrontPage />
              </Route>
            </Switch>
          </Container>
        </main>
      </Router>
    </div>
  );
}

export default App;
