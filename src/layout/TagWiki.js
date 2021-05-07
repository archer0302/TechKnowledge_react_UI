import React from 'react';
import Network from '../graph/NetWork';
import TrendGraph from '../graph/TrendGraph';
import TagInfo from '../grid/TagInfo';
import TopQuestions from '../grid/TopQuestions';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from "react-router-dom";
import { fetchSingleRelation } from '../data/RelationJson';

export default function TagWiki() {

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

  const relation = fetchSingleRelation(tag, false);
  
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
      <Grid item xs={6}>
        <Grid container spacing={4} justify='left'>
          <Grid item>
            <TagInfo tagName={tag}/>
          </Grid>
          <Grid item>
            <TrendGraph tags={[tag]}/>
          </Grid>
          <Grid item xs={12}>
            <TopQuestions tagName={tag}/>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={5}>
        <Grid container spacing={1} alignItems='stretch' className={classes.knowledgeGraph}>
          <Grid item xs={12}>
            {/* <NetworkGraph center={tag} /> */}
            <Network nodesData={relation.nodes} linkData={relation.links} 
            width={500} height={480} nodeStrength={-32} iter={10}
            centerForce={0.05}/>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
} 