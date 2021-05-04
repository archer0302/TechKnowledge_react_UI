import React from 'react';
import fetchTrendGraph from '../data/TrendGraphJson';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import * as d3 from 'd3';

const colors = d3.schemeCategory10;

function TrendGraph({tag}) {
  const dataArray = tag.map(t => ({'name': t, 'data': fetchTrendGraph(t)}));
  dataArray.sort((a, b) => b.data.length - a.data.length);

  

  return (
    <LineChart width={550} height={300}>
      {dataArray.map((s, index) => (
        <Line dataKey="count" data={s.data} name={s.name} key={s.name} dot={false} stroke={colors[index%colors.length]}/>
      ))
      }
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="ym" type="category" allowDuplicatedCategory={false}/>
      <YAxis dataKey="count" />
      <Legend />
      <Tooltip />
    </LineChart>
  )
}

export default TrendGraph;