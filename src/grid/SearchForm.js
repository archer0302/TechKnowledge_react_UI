import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import tag_list from '../data/tag_full_list.json';
import { makeStyles } from '@material-ui/core';

export default function SearchForm({ setTags, tags }) {
  const [error, setError] = useState(false);
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

  return (
    <div style={{display:'flex', flexDirection: 'row', alignItems: 'center'}}>
      <div style={{display:'flex', flexDirection: 'row', alignItems: 'center'}}>
        <div className={classes.search}>
          <Autocomplete
            multiple
            id="tags-outlined"
            value={tags}
            onChange={(event, newValue) => {
              if (newValue) {
                if (newValue.length > 2) {
                  setError(true);
                  setAlert('Maximum 2 tags.');
                } else {
                  for (const tag of newValue) {
                    if (!tag_list.includes(tag)) {
                      setError(true);
                      setAlert('Tag ' + tag + ' not found.');
                      return;
                    }
                  }
            
                  setError(false);
                  setTags(newValue);
                }
              }
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
                label="search tags"
              />
            )}
          />
        </div>
      </div>
      
      <div style={{marginLeft: '10px'}}>
        {(error && !!alert) ? <Alert severity="error">{alert}</Alert> : ''}
      </div>
    </div>
  )
}