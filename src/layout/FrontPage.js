import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import tag_list from '../data/tag_full_list.json';
import NetWork from '../graph/NetWork';
import { Redirect } from "react-router-dom";
import fetchRelation from '../data/RelationJson';
import * as d3 from 'd3';

export default function FrontPage() {

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

  const top10 = ['javascript',
  'java',
  'python',
  'c#',
  'php',
  'android',
  'c++',];

  let nodesData = [];
  let linkData = [];
  const colors = d3.schemeCategory10;
  console.log(colors);

  top10.forEach((tag, i) => {
    console.log(i + ", " + colors[i]);
    let relation = fetchRelation(tag, true);
    relation.nodes.forEach(n => n.color = colors[i]);
    relation.nodes.forEach(n => {
      // prevent duplicated nodes
      if (!nodesData.some(d => d.name == n.name)) {
        nodesData.push(n);
      // If this is the main node, use the color of the cluster
      } else if (n.name === tag) {
        const index = nodesData.findIndex(e => e.name === tag);
        nodesData[index] = n;
      }
    })
    // nodesData = nodesData.concat(relation.nodes);
    relation.links.forEach(n => {
      n.color = colors[i];
      if (top10.includes(n.source) && top10.includes(n.target)) {
        n.distance = 400;
      } else {
        n.distance = 100;
      }
    });
    linkData = linkData.concat(relation.links);
  });

  return (
    <div>
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
      <div style={{alignItems: 'center', display:'flex', flexDirection: 'column'}}>
        <NetWork nodesData={nodesData} linkData={linkData} width={1600} height={700} />
      </div>
    </div>
  )
}