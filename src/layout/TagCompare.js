import { React, useEffect, useState, useRef } from 'react';
import Network from '../graph/NetWorkFIAB';
import TrendGraph from '../graph/TrendGraph';
import TagInfo from '../grid/TagInfo';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import { processToNetworkGraph } from '../data/Relation';
import getNodes from '../data/db/GetNodeByCenter';
import getLinks from '../data/db/GetLinkByCenter';
import fetchDiffData from '../data/DiffTechData';
import DiffAspect from './DiffAspect';
import { PieChart, Pie, ResponsiveContainer } from "recharts";
import * as d3 from 'd3';

const colors = d3.schemeCategory10;

export default function TagCompare({ tags, setTags }) {
  const [fetched, setFetched] = useState(false);
  const [posts, setPosts] = useState({});
  const [opinions, setOpinions] = useState({});
  const [pieData, setPieData] = useState([]);

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex'
    },
    knowledgeGraph: {
      height: '600px'
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }));

  const classes = useStyles();

  const relation_0 = useRef(null);
  const relation_1 = useRef(null);

  useEffect(() => {
    setFetched(false);
    const nodesPromise_0 = getNodes(tags[0]);
    const linksPromise_0 = getLinks(tags[0]);

    const nodesPromise_1 = getNodes(tags[1]);
    const linksPromise_1 = getLinks(tags[1]);

    Promise.all([nodesPromise_0, linksPromise_0, nodesPromise_1, linksPromise_1])
      .then(data => {
        relation_0.current = processToNetworkGraph(tags[0], data[0].nodes, data[1].links);
        relation_1.current = processToNetworkGraph(tags[1], data[2].nodes, data[3].links);
      }).then(d => setFetched(true));

    const {opinions: opinionsData, posts: postsData} = fetchDiffData(tags);
    setPosts(postsData);
    setOpinions(opinionsData);

    const pData = [{
      name: 'neutral',
      value: 0,
      fill: 'grey'
    },{
      name: tags[0],
      value: 0,
      fill: colors[0]
    },{
      name: tags[1],
      value: 0,
      fill: colors[1]
    }];

    let total = 0

    if (opinionsData) {
      Object.values(opinionsData).forEach((value, i) => {
        pData[0].value = value[0] ? pData[0].value + value[0] : pData[0].value;
        pData[1].value = value[1] ? pData[1].value + value[1] : pData[1].value;
        pData[2].value = value[2] ? pData[2].value + value[2] : pData[2].value;
        total += 1;
      });
      pData.forEach(d => {
        d.value = parseFloat((d.value / total * 100).toFixed(2));
      });
      setPieData(pData);
    }

  }, [tags, relation_0, relation_1]);

  return (
    <Grid
      className={classes.root}
      container
      justify="left"
      spacing={2}
      xs={12}
    >
      <Grid item xs={12}>
        <Grid container 
          spacing={4} 
          justify='left'
          alignItems='stretch'
        >
          <Grid xs={6} item>
            <TagInfo tagName={tags[0]}/>
          </Grid>
          <Grid xs={6} item>
            <TagInfo tagName={tags[1]}/>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        {fetched ? (
          <Grid container 
            spacing={6} 
            justify='left'
            alignItems='stretch'
            >
            <Grid item xs={6}>
            <Card>
              <Network tag={tags[0]} nodesData={relation_0.current.nodes} linkData={relation_0.current.links} 
                width={350} height={350} nodeStrength={-10} iter={5}
                centerForce={0.45} fontSize={7} setTags={setTags}/>
            </Card>
            </Grid>
            <Grid item xs={6}>
              <Card>
                <Network tag={tags[1]} nodesData={relation_1.current.nodes} linkData={relation_1.current.links} 
                  width={350} height={350} nodeStrength={-10} iter={5}
                  centerForce={0.45} fontSize={7} setTags={setTags}/>
              </Card>
            </Grid>
          </Grid>
          ) : null}
      </Grid>

      <Grid item xs={12}>
        <Grid container 
          spacing={6} 
          justify='left'
          alignItems='stretch'
        >
          <Grid item xs={6}>
            <h4>Asking Trend on StackOverflow</h4>
            <TrendGraph height={350} tags={tags}/>
          </Grid>
          <Grid item xs={6}>
            {
              !!pieData ? (
                <div style={{ width: "100%", height: 400 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie dataKey="value" data={pieData} label={d => `${d.name}: ${d.value}%`} isAnimationActive={false}/>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              ) : ''
            }
          </Grid>
          
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <List>
          {!!opinions && !!posts ? 
            Object.entries(opinions).map(([key, value], index) => {
              return (
                <DiffAspect aspect={key} opinions={value} tags={tags} posts={posts} />
              )
            }) : ''
          }
        </List>
      </Grid>
    </Grid>
  )
} 