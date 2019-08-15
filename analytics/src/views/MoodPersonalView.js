import React, {Component} from 'react';

import Mood from '../components/MoodChart';
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

export default class PersonalMoodView extends Component {
  render(){
    return (
      <div>
      <h1>Wie ist deine persönliche Stimmung in Bezug auf VcA?</h1>
      <Paper className={classes().paper}>
        <Mood id="1"/>
      </Paper>
      
      </div>
    );
  }
}