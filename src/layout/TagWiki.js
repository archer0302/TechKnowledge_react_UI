import { React, useEffect, useState, useRef} from 'react';
// import Network from '../graph/NetWork';
import Network from '../graph/NetWorkFIAB';
import TrendGraph from '../graph/TrendGraph';
import TagInfo from '../grid/TagInfo';
import TopQuestions from '../grid/TopQuestions';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from "react-router-dom";
import { processToNetworkGraph } from '../data/Relation';
import { Card } from '@material-ui/core';
import getNodes from '../data/db/GetNodeByCenter';
import getLinks from '../data/db/GetLinkByCenter';

export default function TagWiki() {
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

  const { tag } = useParams();

  const relation = useRef(null);

  useEffect(() => {
    const nodesPromise = getNodes(tag);
    const linksPromise = getLinks(tag);
    Promise.all([nodesPromise, linksPromise]).then(data => {
      relation.current = processToNetworkGraph(tag, data[0].nodes, data[1].links);
    }).then(d => setFetched(true));
  }, [tag, relation]);


  return (
    <Grid
      className={classes.root}
      container
      direction="row"
      justify="left"
      alignItems="stretch"
      spacing={2}
      xs={12}
    >
      <Grid item xs={12}>
        <TagInfo tagName={tag}/>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Grid container direction='column' spacing={2}>
          <Grid item xs={12}>
            <h4>Asking Trend on StackOverflow</h4>
            <TrendGraph height={350} tags={[tag]}/>
          </Grid>
          <Grid item xs={12}>
            <TopQuestions tagName={tag}/>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Grid item xs={12}>
          <Card>
            {fetched ? (
              <Network tag={tag} nodesData={relation.current.nodes} linkData={relation.current.links} 
              width={350} height={350} nodeStrength={-20} iter={5}
              centerForce={0.45} fontSize={6}
            />
            ) : null}
          </Card>
        </Grid>
      </Grid>
    </Grid>
  )
} 