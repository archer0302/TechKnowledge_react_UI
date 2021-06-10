import React from 'react';
import Network from '../graph/NetWorkFIAB';
import TrendGraph from '../graph/TrendGraph';
import TagInfo from '../grid/TagInfo';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from "react-router-dom";
import { newNodeLinks } from '../data/RelationJson';

export default function TagCompare() {

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex'
    },
    knowledgeGraph: {
      height: '600px'
    }
  }));

  const classes = useStyles();

  let { tags } = useParams();
  tags = tags.split(',');

  const relation_0 = newNodeLinks(tags[0], false);
  const relation_1 = newNodeLinks(tags[1], false);

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
        <Grid container 
          spacing={6} 
          justify='left'
          alignItems='stretch'
        >
          <Grid item xs={6}>
            <Card>
              <Network nodesData={relation_0.nodes} linkData={relation_0.links} 
                width={350} height={350} nodeStrength={-10} iter={5}
                centerForce={0.45} fontSize={7}/>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card>
              <Network nodesData={relation_1.nodes} linkData={relation_1.links} 
                width={350} height={350} nodeStrength={-10} iter={5}
                centerForce={0.45} fontSize={7}/>
            </Card>
          </Grid>
        </Grid>
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