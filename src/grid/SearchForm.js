import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import tag_list from '../data/tag_full_list.json';
import { Redirect } from "react-router-dom";
import { makeStyles } from '@material-ui/core';

export default function SearchForm() {

  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const [notFound, setNotFound] = useState(false);
  const [alert, setAlert] = useState('');

  const useStyles = makeStyles((theme) => ({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '160px',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: '400px',
      },
    },
    inputRoot: {
      color: 'black',
      backgroundColor: 'white'
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '20ch',
      },
    }
  }));

  const classes = useStyles();

  const filterOptions = createFilterOptions({
    matchFrom: 'any',
    limit: 10,
  });

  const handleSubmit = e => {
    e.preventDefault();
    if (value) {
      for (const tag of value) {
        if (!tag_list.includes(tag)) {
          setNotFound(true);
          setAlert(tag);
          return;
        }
      }

      setResult(value);
    }
  }

  return (
    <form style={{display:'flex', flexDirection: 'row', alignItems: 'center'}} onSubmit={handleSubmit}>
      <div style={{display:'flex', flexDirection: 'row', alignItems: 'center'}}>
        <div className={classes.search}>
          <Autocomplete
            multiple
            id="tags-outlined"
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            classes={{
              inputRoot: classes.inputRoot
            }}
            options={tag_list}
            getOptionLabel={(tag) => tag}
            filterSelectedOptions
            filterOptions={filterOptions}
            size="small"
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="select tags"
              />
            )}
          />
        </div>
        <div style={{marginLeft: '10px'}}>
          <Button variant="contained" color="primary" size="medium" type="submit">
            Search
          </Button>
        </div>
      </div>
      
      <div style={{marginLeft: '10px'}}>
        {(notFound && !!alert) ? <Alert severity="error">Tag {alert} not found.</Alert> : ''}
        {result ? result.length === 1 ? <Redirect to={"/TagWiki/" + encodeURI(result)} /> : 
          <Redirect to={"/TagCompare/" + encodeURI(result)} /> : ''}
      </div>
    </form>
  )
}