import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TagWiki from './layout/TagWiki';
import TagCompare from './layout/TagCompare';
import FrontPage from './layout/FrontPage';
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";



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
      background: '#EBEBE9'
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

  return (
    <div className={classes.root}>
      <Router>
        {/* Header */}
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <ListItem button component={Link} to='/'>
              <ListItemText primary={'TechKnowledge'} />
            </ListItem>
            {/* <Link to="/" style={{ textDecoration: 'none' }}>
              <Typography variant="h6" noWrap>
                TechKnowledge
              </Typography>
            </Link> */}
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
              <ListItem button component={Link} to='/TagWiki/python'>
                <ListItemText primary={'TechWiki'} />
              </ListItem>
              <ListItem button component={Link} to="/TagCompare">
                <ListItemText primary={'TechCompare'} />
              </ListItem>
            </List>
          </div>
        </Drawer>

        {/* Main content */}
        <main className={classes.content}>
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
        </main>
      </Router>
    </div>
  );
}

export default App;
