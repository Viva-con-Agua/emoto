import React, { Component } from 'react';

import Moods from '../components/MoodOverviewChart';
import MoodsStacked from './../components/MoodOverviewChartStacked';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

function  classes() { 
  return makeStyles(theme => ({
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
      margin: '10px'
    }
  }));
} 

export default class CrewsView extends Component {
 
  render() {
      return (
        <div>
        <h1>Zusammenfassung</h1>
        <Paper className={classes().paper}>
          <Moods />
        </Paper>
        <br />
        <Paper className={classes().paper}>
          <MoodsStacked />
        </Paper>
        
        </div>
      );
  }
}


