import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import tag_list from '../data/tag_full_list.json';

export default function FrontPage() {
  return (
    <div style={{ width: 300 }}>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={tag_list}
        renderInput={(params) => (
          <TextField {...params} label="freeSolo" margin="normal" variant="outlined" />
        )}
      />
    </div>
  )
}