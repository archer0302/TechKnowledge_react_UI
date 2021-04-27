import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

function TagInfo({tagName}) {
  const [excerpt, setExcerpt] = useState([]);

  useEffect(() => {
    axios.get("https://api.stackexchange.com/2.2/tags/" + tagName + "/wikis?site=stackoverflow")
      .then(res => res.data.items[0])
      .catch(error => console.log(error))
      .then(
        (result) => {
          console.log(result);
          setExcerpt(result.excerpt);
        }
      )
  })

  return (
    <Card>
      <CardContent>
        <Typography variant='h4'>
          {tagName}
        </Typography>
        <Typography variant='body1'>
          {String(excerpt)}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default TagInfo;

