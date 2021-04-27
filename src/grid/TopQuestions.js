import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import axios from 'axios';


function TopQuestions({tagName}) {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    axios.get("https://api.stackexchange.com/2.2/tags/" + tagName + "/faq?site=stackoverflow")
      .then(res => res.data.items)
      .catch(error => console.log(error))
      .then(
        (result) => {
          setFaqs(result);
        }
      )
  })

  return (
    <Card>
      <CardContent>
        <Typography variant='h4'>
          Top Questions
        </Typography>
        {faqs.slice(0, 5).map((faq) =>
          <Typography variant='body1'>
            <Link href={faq.link}>
              {faq.title}
            </Link>
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}

export default TopQuestions;

