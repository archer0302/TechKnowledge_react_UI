import React from 'react';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

export default function DiffPost({ post, open, postId }) {

  const useStyles = makeStyles((theme) => ({
    nested: {
      paddingLeft: theme.spacing(4),
    },
    nestedChild: {
      paddingLeft: theme.spacing(6),
    },
    popover: {
      pointerEvents: 'none',
    },
    paper: {
      padding: theme.spacing(1),
    }
  }));

  const classes = useStyles();  
  let post_content = post.content;

  if (post.highlight) {
    post_content = post.content.split(post.highlight)
      .join(`<b>${post.highlight}</b>`);
  }
  
  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        <ListItemText
          primary={
            <ListItem className={classes.nested}>
              <div dangerouslySetInnerHTML={{__html: post_content}}/>
            </ListItem>
          }
          secondary={
            <div className={classes.nestedChild}>
              <Typography>
                From  
                <Link href={`https://stackoverflow.com/questions/${postId}`} target="_blank">
                  #{postId}
                </Link>
              </Typography>
              
            </div>
          }
        />
      </List>
      <Divider/>
    </Collapse> 
  )
}