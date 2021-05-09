import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import LabelRounded from '@material-ui/icons/LabelRounded';
import * as he from 'he';
import { Grow, Icon } from '@material-ui/core';

function TagInfo({tagName}) {
  const [excerpt, setExcerpt] = useState([]);
  const [ready, setReady] = useState(false);

  console.log("tag info: " + tagName);
  useEffect(() => {
    axios.get("https://api.stackexchange.com/2.2/tags/" + encodeURIComponent(tagName) + "/wikis?site=stackoverflow&key=fTs*5TgDx2*UnZFUQ8hHEQ((")
      .then(res => res.data.items[0])
      .catch(error => console.log(error))
      .then(
        (result) => {
          console.log(result);
          setExcerpt(result.excerpt);
          setReady(true);
        }
      )
  }, [tagName]);

  return (
    <Grow in={ready}
      {...(ready ? { timeout: 1000 } : {})}>
      <Card>
        <CardContent style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
        }}>
          <LabelRounded fontSize='large' style={{ marginRight:'10px' }}/>
          <Typography variant='h4' style={{ marginBottom: '10px' }}>
            {tagName}
          </Typography>
          <Typography variant='body1'>
            {he.decode(String(excerpt))}
          </Typography>
        </CardContent>
      </Card>
    </Grow>
  )
}

export default TagInfo;

