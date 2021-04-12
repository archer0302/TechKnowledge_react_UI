import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: '40%',
      margin: theme.spacing(3),
    }
  })
);

function TagInfo({tagName}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant='h4'>
          {tagName}
        </Typography>
        <Typography variant='body1'>
          Python is a multi-paradigm, dynamically typed, multipurpose programming language. It is designed to be quick to learn, understand, and use, and enforce a clean and uniform syntax. Please note that Python 2 is officially out of support as of 01-01-2020. Still, for version-specific Python questions, add the [python-2.7] or [python-3.x] tag. When using a Python variant (e.g., Jython, PyPy) or library (e.g., Pandas and NumPy), please include it in the tags.
        </Typography>
      </CardContent>
    </Card>
  )
}

export default TagInfo;

