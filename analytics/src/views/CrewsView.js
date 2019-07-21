import React, { Component } from 'react';

import Crews from '../components/CrewsChart';
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
        <h1>Crews</h1>
        <p>Das folgende Diagramm liefert eine Übersicht über die Anzahl der Teilnehmenden pro Crew. Die Y-Achse beschreibt hierbei die Anzahl der Teilnehmenden. Die X-Achse steht für die Anzahl an Crews mit der entsprechendne Zahl von Teilnehmenden.</p>
        <p><b>Interpretation:</b> Es gibt <i>[X-Achsen-Wert]</i> Crews, für die <i>[Y-Achsen-Wert]</i> Personen an der Testphase von EMOTO teilgenommen haben. </p>
        <Paper className={classes().paper}>
          <Crews />
        </Paper>
        </div>
      );
  }
}


