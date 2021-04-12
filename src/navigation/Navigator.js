import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '200px',
    background: 'grey',
  },
}));

function Navigation() {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <List component="nav">
        <ListItem button>
          <ListItemText>
            TechWiki
          </ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemText>
            TechCompare
          </ListItemText>
        </ListItem>
      </List>
    </div>
  )
}

export default Navigation;