import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';

function Navigation() {
  const useStyle = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1)
    }
  }))

  const classes = useStyle();

  return (
    <List component="nav">
      <ListItem button className={classes.button}>
        <ListItemText>
          TechWiki
        </ListItemText>
      </ListItem>
      <ListItem button className={classes.button}>
        <ListItemText>
          TechCompare
        </ListItemText>
      </ListItem>
    </List>
  )
}

export default Navigation;