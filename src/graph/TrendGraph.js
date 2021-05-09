import React from 'react';
import fetchTrendGraph from '../data/TrendGraphJson';
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import * as d3 from 'd3';
import { Card, CardContent, Typography } from '@material-ui/core';

const colors = d3.schemeCategory10;

function TrendGraph({height, tags}) {
  const data = fetchTrendGraph(tags);
  console.log(data);
  return (
    <Card style={{background: 'transparent'}}>
      {/* <CardContent> */}
        {/* <Typography variant='h5'>
          {tags} trend on StackOverflow.com
        </Typography> */}
        <ResponsiveContainer width="100%" height={height}>
          <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
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
            <CartesianGrid stroke="#ccc" strokeDashArray="3 8 " vertical={false}/>
            <XAxis dataKey="ym" tickFormatter={d => d.slice(-4)} angle={20} mirror={true} tickLine={false}/>
            <YAxis mirror={true} tickLine={false} tickFormatter={d => d == 0 ? '' : d}  />
            { tags.length > 1 ? (<Legend />) : ('') }
            <Tooltip />
          </AreaChart>  
        </ResponsiveContainer>
      {/* </CardContent> */}
    </Card>
  )
}

export default TrendGraph;