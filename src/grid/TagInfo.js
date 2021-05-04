import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import * as he from 'he';

function TagInfo({tagName}) {
  const [excerpt, setExcerpt] = useState([]);

  console.log("tag info: " + tagName);
  useEffect(() => {
    axios.get("https://api.stackexchange.com/2.2/tags/" + encodeURIComponent(tagName) + "/wikis?site=stackoverflow&key=fTs*5TgDx2*UnZFUQ8hHEQ((")
      .then(res => res.data.items[0])
      .catch(error => console.log(error))
      .then(
        (result) => {
          console.log(result);
          setExcerpt(result.excerpt);
        }
      )
  }, [tagName]);

  return (
    <Card>
      <CardContent>
        <Typography variant='h4'>
          {tagName}
        </Typography>
        <Typography variant='body1'>
          {he.decode(String(excerpt))}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default TagInfo;

