import React from 'react';
import fetchTrendGraph from '../data/TrendGraphJson';
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import * as d3 from 'd3';

const colors = d3.schemeCategory10;

function TrendGraph({tags}) {
  const data = fetchTrendGraph(tags);
  console.log(data);
  return (
    <AreaChart width={700} height={400} data={data}>

      <defs>
        {Object.keys(data[0]).map((tag, index) => {
          if (tag !== 'ym') {
            return (
              <linearGradient id={"color" + tag} x1="0" y1="0" x2="0" y2="1.2" key={index}>
                <stop offset="5%" stopColor={colors[index%colors.length]} stopOpacity={0.8} />
                <stop offset="95%" stopColor={colors[index%colors.length]} stopOpacity={0} />
              </linearGradient>
            )
          }
          return ('');
          })
        }
      </defs>
      {Object.keys(data[0]).map((tag, index) => {
        if (tag !== 'ym') {
          return (
            <Area type="monotone" dataKey={tag} key={index}
              stroke={colors[index%colors.length]} 
              fillOpacity={1} fill={"url(#color" + tag + ")"}
            />
          )
        }
        return ('');
        })
      }
      <CartesianGrid stroke="#ccc" strokeDashArray="3 3"/>
      <XAxis dataKey="ym" tickFormatter={d => d.slice(-4)}/>
      <YAxis />
      <Legend />
      <Tooltip />
    </AreaChart>
  )
}

export default TrendGraph;