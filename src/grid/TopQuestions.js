import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import axios from 'axios';
import * as he from 'he';


function TopQuestions({tagName}) {
  const [faqs, setFaqs] = useState([]);

  console.log("top question: " + tagName);
  useEffect(() => {
    axios.get("https://api.stackexchange.com/2.2/tags/" + tagName + "/faq?site=stackoverflow&key=fTs*5TgDx2*UnZFUQ8hHEQ((")
      .then(res => res.data.items)
      .catch(error => console.log(error))
      .then(
        (result) => {
          setFaqs(result.slice(0, 5));
        }
      )
  }, [tagName]);

  return (
    <Card>
      <CardContent>
        <Typography variant='h4'>
          Top Questions
        </Typography>
        {faqs.map((faq, i) =>
          <Typography variant='body1' key={i}>
            <Link href={faq.link}>
              {he.decode(String(faq.title))}
            </Link>
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}

export default TopQuestions;

