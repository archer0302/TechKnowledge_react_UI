import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import tag_list from '../data/tag_full_list.json';
import { Redirect } from "react-router-dom";

export default function SearchForm() {

  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const [notFound, setNotFound] = useState(false);
  const [alert, setAlert] = useState('');

  const filterOptions = createFilterOptions({
    matchFrom: 'any',
    limit: 10,
  });

  const handleSubmit = e => {
    e.preventDefault();
    console.log(value);
    if (tag_list.includes(value)) {
      setNotFound(false);
      setResult(value);
    } else {
      setNotFound(true);
      setAlert(value);
    }
  }

  return (
    <form style={{display:'flex', flexDirection: 'row', alignItems: 'center'}} onSubmit={handleSubmit}>
      <div>
        <Autocomplete
          value={value}
          onInputChange={(event, newValue) => {
            setValue(newValue);
          }}
          style={{width: 500}}
          id="free-solo-demo"
          freeSolo
          filterOptions={filterOptions}
          options={tag_list}
          size="small"
          renderInput={(params) => (
            <TextField {...params} label="freeSolo" margin="normal" variant="outlined" />
          )}
        />
      </div>
      <div style={{marginLeft: '10px'}}>
        <Button variant="contained" color="primary" size="medium" type="submit">
          Search
        </Button>
      </div>
      <div style={{marginLeft: '10px'}}>
        {(notFound && !!alert) ? <Alert severity="error">Tag {alert} not found.</Alert> : ''}
        {result ? <Redirect to={"/TagWiki/" + encodeURI(result)} /> : ''}
      </div>
    </form>
  )
}