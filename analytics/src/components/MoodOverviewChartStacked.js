import React, {Component} from 'react';
import {HorizontalBar} from 'react-chartjs-2';
import Axios from 'axios';
const API_ROUTE = 'http://localhost:8080/analytics/moods'

const barOptions_stacked = {
  tooltips: {
      enabled: false
  },
  hover :{
      animationDuration:0
  },
  scales: {
      xAxes: [{
          ticks: {
              beginAtZero:true,
              fontFamily: "'Open Sans Bold', sans-serif",
              fontSize:11
          },
          scaleLabel:{
              display:false
          },
          gridLines: {
          }, 
          stacked: true
      }],
      yAxes: [{
          gridLines: {
              display:false,
              color: "#fff",
              zeroLineColor: "#fff",
              zeroLineWidth: 0
          },
          ticks: {
              fontFamily: "'Open Sans Bold', sans-serif",
              fontSize:11
          },
          stacked: true
      }]
  },
  legend:{
      display:true
  },
};

function getChartData(){
  let data = {
    datasets: [
      {
        data: [],
        label: "sehr schlecht",
        backgroundColor: "rgba(178,34,34,0.8)",
        hoverBackgroundColor: "rgba(178,34,34,0.9)",
      },{
        data: [],
        label: "schlecht",
        backgroundColor: "rgba(178,34,34,0.5)",
        hoverBackgroundColor: "rgba(178,34,34,0.6)",
      },{
        data: [],
        label: "eher schlecht",
        backgroundColor: "rgba(178,34,34,0.2)",
        hoverBackgroundColor: "rgba(178,34,34,0.3)",
      },{
        data: [],
        label: "eher gut",
        backgroundColor: "rgba(0,139,0,0.2)",
        hoverBackgroundColor: "rgba(0,139,0,0.3)",
        
      },{
        data: [],
        label: "gut",
        backgroundColor: "rgba(0,139,0,0.5)",
        hoverBackgroundColor: "rgba(0,139,0,0.6)",
      },{
        data: [],
        label: "sehr gut",
        backgroundColor: "rgba(0,139,0,0.8)",
        hoverBackgroundColor: "rgba(0,139,0,0.9)",
      }
    ],
    labels: []
  }
  return Axios.get(API_ROUTE)
  .then(function(r){
    r.data.forEach( e => {
      data.labels.push(e.question);
      e.answers.forEach((a, index) => {
          data.datasets[index].data.push(a.quantity);
      });
    });

    return Promise.resolve(data);
  });
}

export default class MoodsOverviewStacked extends Component{
  constructor(props) {
    super(props)
    this.state={
      isLoaded: false,
      chart: {
        options: barOptions_stacked,
        data: {
          labels: ['foo'],
          datasets: []
        }
      }
    };

    
  };

  componentDidMount() {
    getChartData()
    .then((d) => {
      console.log(d);
      this.setState({ 
        isLoaded: true,
        chart : {
          data: d,
          options: barOptions_stacked
      }});

      console.log(this.state);
      return Promise.resolve();
    })
    .catch((err) => {
      console.log(err);
      return Promise.resolve();
    });
  }
  
  render(){
    return (
      <React.Fragment>
         {this.state.isLoaded ? <HorizontalBar data={this.state.chart.data} options={this.state.chart.options}/>: <div>Still Loading... </div> }
      </React.Fragment>
    );
  }
}


/*
this.state={
      chart: {
        options: barOptions_stacked,
        data: {
          labels: [
            "Wie ist deine persönliche Stimmung in Bezug auf VcA?", 
            "Wie fandest du die letzte Aktion, an der du teilgenommen hast?", 
            "Wie ist deiner Meinung nach die aktuelle Stimmung in deiner Crew?"
          ],
          datasets: [{
              data: [2, 0, 2],
              backgroundColor: "rgba(63,103,126,1)",
              hoverBackgroundColor: "rgba(50,90,100,1)",
              label: "schlecht"
          },{
              data: [10, 8, 18],
              backgroundColor: "rgba(163,103,126,1)",
              hoverBackgroundColor: "rgba(140,85,100,1)",
              label: "neutral"
          },{
              data: [55, 57, 43],
              backgroundColor: "rgba(63,203,226,1)",
              hoverBackgroundColor: "rgba(46,185,235,1)",
              label: "gut"
          }]
        }
      }
    };
    */