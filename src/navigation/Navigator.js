import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';

function Navigation() {
  return (
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
  )
}

export default Navigation;