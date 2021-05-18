import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import LabelRounded from '@material-ui/icons/LabelRounded';
import * as he from 'he';
import { Grow } from '@material-ui/core';

function TagInfo({tagName}) {
  const [excerpt, setExcerpt] = useState([]);
  const [synonyms, setSynonyms] = useState([]);
  const [excerptReady, setExcerptReady] = useState(false);
  const [synonymsReady, setSynonymsReady] = useState(false);

  useEffect(() => {
    axios.get("https://api.stackexchange.com/2.2/tags/" + encodeURIComponent(tagName) + "/wikis?site=stackoverflow&key=fTs*5TgDx2*UnZFUQ8hHEQ((")
      .then(res => res.data.items[0])
      .catch(error => console.log(error))
      .then(
        (result) => {
          setExcerpt(result.excerpt);
          setExcerptReady(true);
        }
      )

    axios.get("https://api.stackexchange.com/2.2/tags/" + encodeURIComponent(tagName) + "/synonyms?order=desc&sort=applied&site=stackoverflow&key=fTs*5TgDx2*UnZFUQ8hHEQ((")
    .then(res => res.data.items)
    .catch(error => console.log(error))
    .then(
      (result) => {
        const synonyms = result.map((element) => element.from_tag);
        setSynonyms(synonyms);
        setSynonymsReady(true);
      }
    )
  }, [tagName]);

  return (
    <Grow in={excerptReady && synonymsReady}
      {...(excerptReady && synonymsReady ? { timeout: 1000 } : {})}>
      <Card>
        <CardContent style={{
            flexWrap: 'wrap',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px'}}>
            <LabelRounded fontSize='large' style={{ marginRight:'10px' }}/>
            <Typography variant='h4'>
              {tagName}
            </Typography>
          </div>
          <Typography variant='body1'>
            {he.decode(String(excerpt))}
          </Typography>
          {synonyms.length !== 0 ? (
              <Typography variant='body1'>
              <br/><b>Synonyms: </b>{synonyms.join(', ')}
            </Typography>
            ) : null
          }
        </CardContent>
      </Card>
    </Grow>
  )
}

export default TagInfo;

