import React, { useState } from 'react';

import fetchTrendGraph from '../data/TrendGraphJson';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

function TrendGraph({tag}) {
  const data = fetchTrendGraph(tag);

  return (
    <LineChart width={600} height={300} data={data}>
      <Line type="monotone" dataKey="count" dot={false}/>
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="ym" />
      <YAxis />
    </LineChart>
  )
}

export default TrendGraph;