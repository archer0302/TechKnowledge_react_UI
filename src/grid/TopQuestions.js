import React, { useState, useEffect } from 'react';
import { CardContent, Typography, Grow } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import axios from 'axios';
import * as he from 'he';


function TopQuestions({tagName}) {
  const [faqs, setFaqs] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    axios.get("https://api.stackexchange.com/2.2/tags/" + tagName + "/faq?site=stackoverflow&key=fTs*5TgDx2*UnZFUQ8hHEQ((")
      .then(res => res.data.items)
      .catch(error => console.log(error))
      .then(
        (result) => {
          setFaqs(result.slice(0, 5));
          setReady(true);
        }
      )
  }, [tagName]);

  return (
    <Grow in={ready}
      {...(ready ? { timeout: 1000 } : {})}>
      <CardContent>
        <Typography variant='h5'>
          Top Questions on StackOverflow
        </Typography>
        {faqs.map((faq, i) =>
          <Typography variant='body1' key={i}>
            <Link href={faq.link}>
              {he.decode(String(faq.title))}
            </Link>
          </Typography>
        )}
      </CardContent>
    </Grow>
  )
}

export default TopQuestions;

