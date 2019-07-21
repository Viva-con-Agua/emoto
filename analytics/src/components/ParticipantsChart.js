import React, {Component} from 'react';
import {HorizontalBar} from 'react-chartjs-2';
import Axios from 'axios';

const API_ROUTE = 'http://localhost:8080/analytics/participants'

function getParticipantData(t){
  return Axios.get(API_ROUTE)
  .then(function(r) {
    let new_data = [];
    
    new_data.push(r.data.nwt);
    new_data.push(r.data.visitors);
    new_data.push(r.data.inactive);
    new_data.push(r.data.active);
    new_data.push(r.data.contentAnalysis);
    new_data.push(r.data.statisticAnalysis);
    
    return Promise.resolve(new_data);
  });
}

function defineChart(d) {
  return {
    labels: ['Teilnehmende NWT', 'Besucher*innen EMOTO', 'inaktive Profile', 'aktive Profile', 'statistische Auswertung', 'inhaltliche Auswertung'],
    datasets: [
      {
        label: 'Anzahl',
        backgroundColor: 'rgba(0,144,191,0.2)',
        borderColor: 'rgba(0,144,191,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(0,144,191,0.6)',
        hoverBorderColor: 'rgba(0,144,191,1)',
        data: d
      }
    ]
  };
};

export default class Participants extends Component {
  
  constructor(props) {
    super(props)
    this.state ={
      chart : defineChart([0, 0, 0, 0, 0, 0]),
      isLoaded: false
    }
  }

  componentDidMount() {
    getParticipantData()
    .then((d) => {
      this.setState({ 
        isLoaded: true,
        chart : defineChart(d)
      });
      return Promise.resolve();
    })
    .catch((err) => {
      console.log(err);
      return Promise.resolve();
    });
  }

  render() {
    return (
      <React.Fragment>
          {this.state.isLoaded ? <HorizontalBar data={this.state.chart} /> : <div>Still Loading... </div> }
      </React.Fragment>
    );
  }
};
