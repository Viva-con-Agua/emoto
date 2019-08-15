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
      <h1>Wie fandest du die letzte Aktion, an der du teilgenommen hast?</h1>
      <Paper className={classes().paper}>
        <Mood id="2"/>
      </Paper>
      
      </div>
    );
  }
}