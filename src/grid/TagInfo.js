import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

function TagInfo({tagName}) {
  const [excerpt, setExcerpt] = useState([]);

  useEffect(() => {
    axios.get("https://api.stackexchange.com/2.2/tags/" + tagName + "/wikis?site=stackoverflow&key=fTs*5TgDx2*UnZFUQ8hHEQ((")
      .then(res => res.data.items[0])
      .catch(error => console.log(error))
      .then(
        (result) => {
          console.log(result);
          setExcerpt(result.excerpt);
        }
      )
  })

  const staticExcerpt = {
    "python": "Python is a multi-paradigm, dynamically typed, multipurpose programming language. It is designed to be quick to learn, understand, and use, and enforce a clean and uniform syntax. Please note that Python 2 is officially out of support as of 01-01-2020. Still, for version-specific Python questions, add the [python-2.7] or [python-3.x] tag. When using a Python variant (e.g., Jython, PyPy) or library (e.g., Pandas and NumPy), please include it in the tags.",
    "c#": "C# (pronounced \"see sharp\") is a high level, statically typed, multi-paradigm programming language developed by Microsoft. C# code usually targets Microsoft's .NET family of tools and run-times, which include the .NET Framework, .NET Core and Xamarin among others. Use this tag for questions about code written in C# or C#'s formal specification."
  }

  const tagExcerpt = "A tag is a marker or semantic descriptor. Despite generic origin, this \"tag\" has become synonymous with HTML - if your question is already within this context, its use is likely unnecessary. In a different context, however, the term \"tags\" can also be officially used. One case would be in a SCADA program Ignition, where the tag is one of the basic units placed in a hierarchical system, each having its own tag-path and tag-relative paths towards others."

  return (
    <Card>
      <CardContent>
        <Typography variant='h4'>
          {tagName}
        </Typography>
        <Typography variant='body1'>
          {/* {staticExcerpt[tagName] ? staticExcerpt[tagName] : tagExcerpt} */}
          {String(excerpt)}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default TagInfo;

