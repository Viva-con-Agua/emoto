import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';
import Axios from 'axios';

const API_ROUTE = 'http://localhost:8080/analytics/crews'

function getChartData(t){
  return Axios.get(API_ROUTE)
  .then(function(r) {
    let new_data = {
      labels: [],
      data: []
    };

    r.data.forEach(e => {
      new_data.labels.push(e.users);
      new_data.data.push(e.crews);
    });
    
    
    return Promise.resolve(new_data);
  });
}

function defineChart(data, labels) {
  return {
    labels: labels,
    datasets: [
      {
        label: 'Anzahl Crews mit x Teilnehmenden',
        backgroundColor: 'rgba(0,144,191,0.2)',
        borderColor: 'rgba(0,144,191,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(0,144,191,0.6)',
        hoverBorderColor: 'rgba(0,144,191,1)',
        data: data
      }
    ]
  };
};

export default class Participants extends Component {
  
  constructor(props) {
    super(props)
    this.state ={
      chart : defineChart([], []),
      isLoaded: false
    }
  }

  componentDidMount() {
    getChartData()
    .then((d) => {
      this.setState({ 
        isLoaded: true,
        chart : defineChart(d.data, d.labels)
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
          {this.state.isLoaded ? <Bar data={this.state.chart} /> : <div>Still Loading... </div> }
      </React.Fragment>
    );
  }
};
