import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TagWiki from './layout/TagWiki';
import TagCompare from './layout/TagCompare';
import FrontPage from './layout/FrontPage';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Container } from '@material-ui/core';
import SearchForm from './grid/SearchForm';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
    overrides: {
        MuiCssBaseline: {
            "@global": {
                body: {
                    backgroundColor: "#e7e7e7",
                }
            }
        }
    }
});


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
      height: '100%',
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
      alignItems: 'center',
    }
  }));

  const classes = useStyles();

  const [tags, setTags] = useState([]);

  const cleanTags = () => {
    setTags([]);
  }

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <Router>
          {/* Header */}
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <Link to="/" style={{ textDecoration: 'none', color: 'white' }} onClick={cleanTags}>
                <div>
                  <Typography variant='h6' noWrap className={classes.title}>
                    <span>TechKnowledge</span>
                  </Typography>              
                </div>
              </Link>
              <SearchForm setTags={setTags} tags={tags}/>
            </Toolbar>
          </AppBar>
          {/* Main content */}
          <main className={classes.main}>
            <Container maxWidth='lg' className={classes.container}>
              <Toolbar/>
              {tags.length === 1 ?
                <TagWiki tag={tags[0]} setTags={setTags}/> :
                  tags.length === 2 ?
                  <TagCompare tags={tags} setTags={setTags}/> :
                  <FrontPage setTags={setTags}/>
              }
              <div style={{alignContent: 'center'}}>About us | Feedback</div>
            </Container>
          </main>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
