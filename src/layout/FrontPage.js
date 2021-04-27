import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import tag_list from '../data/tag_full_list.json';

export default function FrontPage() {

  const filterOptions = createFilterOptions({
    matchFrom: 'any',
    limit: 10,
  });

  return (
    <div style={{display:'flex', flexDirection: 'row', alignItems: 'center'}}>
      <div>
        <Autocomplete
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
        <Button variant="contained" color="primary" size="medium">
          Search
        </Button>
      </div>
    </div>
  )
}