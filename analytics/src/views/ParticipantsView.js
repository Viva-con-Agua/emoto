import React, { Component } from 'react';

import Participants from '../components/ParticipantsChart';
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

export default class ParticipantsView extends Component {
 
  render() {
      return (
        <div>
        <h1>Teilnehmende</h1>
        <p>Das folgende Diagramm zeigt eine Übersicht der Testkohorte. Ausgangspunkt sind alle Teilnehmenden des NWT 2019. Es war den Supporter*innen freigestellt EMOTO zu nutzen. Ebenso konnten die Supporter*innen frei entscheiden, ob ihre Daten für statistische und inhaltliche Auswertungen genutzt werden dürfen.</p>

        <p>Inaktive Profile beschreiben die Supporter*innen, welche EMOTO besucht haben, jedoch die initiale Aktivierung nicht abgeschlossen haben.</p>
        <Paper className={classes().paper}>
          <Participants />
        </Paper>
        </div>
      );
  }
}


