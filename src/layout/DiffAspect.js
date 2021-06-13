import React, {useState} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Popover from '@material-ui/core/Popover';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import DiffPost from './DiffPost';
import * as d3 from 'd3';

const colors = d3.schemeCategory10;

export default function DiffAspect({ aspect, opinions, tags, posts }) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const useStyles = makeStyles((theme) => ({
    nested: {
      paddingLeft: theme.spacing(4),
    },
    popover: {
      pointerEvents: 'none',
    },
    paper: {
      padding: theme.spacing(1),
    }
  }));
  
  const classes = useStyles();  

  const handleClick = () => {
    setOpen(!open);
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const pop = Boolean(anchorEl);

  return (
    <div>
      <ListItem key={aspect} button onClick={handleClick} >
        <ListItemText 
          primary={
            <div>
              <Typography variant="h5">{aspect}</Typography>
            </div>
          } 
          secondary={
            <div onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose} >
              <div class="progress-bar orange" style={{backgroundColor: colors[0], width: opinions[0] * 100 + '%', height: '20px', float: 'left'}}></div>
              <div class="progress-bar grey" style={{backgroundColor: 'grey', width: opinions[2] * 100 + '%', height: '20px', float: 'left'}}></div>
              <div class="progress-bar blue" style={{backgroundColor: colors[1], width: opinions[1] * 100 + '%', height: '20px', float: 'left'}}></div>
            </div>
          } />
          {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      {
        opinions.ids.map(id => {
          return <DiffPost post={posts[id]} open={open} postId={id}/>
        })
      }
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={pop}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography>
          {tags[0] + ': ' + (opinions[0] ? opinions[0] * 100 : 0).toFixed(2) + '%'}, 
          {'neutral: ' + (opinions[2] ? opinions[2] * 100 : 0).toFixed(2) + '%'}, 
          {tags[1] + ': ' + (opinions[1] ? opinions[1] * 100 : 0).toFixed(2) + '%'} 
        </Typography>
      </Popover>
    </div>
  )

}