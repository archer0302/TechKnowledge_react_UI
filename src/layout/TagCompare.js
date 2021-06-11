import { React, useEffect, useState, useRef } from 'react';
import Network from '../graph/NetWorkFIAB';
import TrendGraph from '../graph/TrendGraph';
import TagInfo from '../grid/TagInfo';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from "react-router-dom";
import { processToNetworkGraph } from '../data/Relation';
import getNodes from '../data/db/GetNodeByCenter';
import getLinks from '../data/db/GetLinkByCenter';

export default function TagCompare() {
  const [fetched, setFetched] = useState(false);

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex'
    },
    knowledgeGraph: {
      height: '600px'
    }
  }));

  const classes = useStyles();

  let tags = decodeURIComponent(useParams()['tags']);
  tags = tags.split(',');

  const relation_0 = useRef(null);
  const relation_1 = useRef(null);

  useEffect(() => {
    const nodesPromise_0 = getNodes(tags[0]);
    const linksPromise_0 = getLinks(tags[0]);

    const nodesPromise_1 = getNodes(tags[1]);
    const linksPromise_1 = getLinks(tags[1]);

    Promise.all([nodesPromise_0, linksPromise_0, nodesPromise_1, linksPromise_1])
      .then(data => {
        relation_0.current = processToNetworkGraph(tags[0], data[0].nodes, data[1].links);
        relation_1.current = processToNetworkGraph(tags[1], data[2].nodes, data[3].links);
      }).then(d => setFetched(true));
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
                centerForce={0.45} fontSize={7}/>
            </Card>
            </Grid>
            <Grid item xs={6}>
              <Card>
                <Network tag={tags[1]} nodesData={relation_1.current.nodes} linkData={relation_1.current.links} 
                  width={350} height={350} nodeStrength={-10} iter={5}
                  centerForce={0.45} fontSize={7}/>
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
          
        </Grid>
      </Grid>

      <Grid item xs={12}>
        Comparison
      </Grid>
    </Grid>
  )
} 