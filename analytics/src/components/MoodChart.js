import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';
import Axios from 'axios';

const API_ROUTE = 'http://localhost:8080/analytics/mood'

function getMoodData(id){
  return Axios.get(API_ROUTE+'/'+id)
  .then(function(r){
    let chartValues = {
      labels: [],
      data: []
    };
    
    r.data.forEach(element => {
      chartValues.labels.push(element.answer);
      chartValues.data.push(element.quantity);
    });

    return Promise.resolve(chartValues);
  });
}

function defineChart(labels, data){
  return {
    labels: labels,
    datasets: [
      {
        label: 'Anzahl',
        backgroundColor: [
          'rgba(178,34,34,0.8)',
          'rgba(178,34,34,0.5)',
          'rgba(178,34,34,0.2)',
          'rgba(0,139,0,0.2)',
          'rgba(0,139,0,0.5)',
          'rgba(0,139,0,0.8)'
        ],
        borderWidth: 1,
        hoverBackgroundColor: [
          "rgba(178,34,34,0.9)",
          "rgba(178,34,34,0.6)",
          "rgba(178,34,34,0.3)",
          "rgba(0,139,0,0.3)",
          "rgba(0,139,0,0.6)",
          "rgba(0,139,0,0.9)"
        ],
        data: data
      }
    ]
  };
}

export default class Mood extends Component{
  constructor(props){
    super(props)
    this.state = {
      chart: defineChart([], []),
      isLoaded: false
    }
  }

  componentDidMount(){
    //ToDo Define id by component param
    getMoodData(this.props.id)
    .then((d) => {
      this.setState({
        isLoaded: true,
        chart: defineChart(d.labels, d.data)
      });
      return Promise.resolve();
    })
    .catch((err) => {
      console.log(err);
      return Promise.resolve();
    })
  }

  render(){
    return (
      <React.Fragment>
        {this.state.isLoaded ? <Bar data={this.state.chart} /> : <div>Still Loading... </div> }
      </React.Fragment>
    )
  }
}