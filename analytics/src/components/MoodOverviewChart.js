import React, {Component} from 'react';
import {Radar} from 'react-chartjs-2';
import Axios from 'axios';

const API_ROUTE = 'http://localhost:8080/analytics/moods'
const backgrounds = ["rgba(200,0,0,0.35)", "rgba(0,0,200,0.35)", "rgba(0,200,0,0.35)"];
function getChartData(){
  return Axios.get(API_ROUTE)
  .then(function(r){
    let new_data = []
    r.data.forEach(e => {
      let d = [];
      e.answers.forEach(a => {
        d.push(a.quantity);
      });
      console.log(d);
      new_data.push({
        label: [e.question],
        data: d,
        backgroundColor: backgrounds[e.id-1]
      });
    });

    return Promise.resolve(new_data);
  });
}

function defineChart(dataset) {
  return {
    labels: ["sehr schlecht", "schlecht", "eher schlecht", "eher gut", "gut", "sehr gut"],
    datasets: dataset
  };
};

export default class MoodsOverview extends Component{
  constructor(props) {
    super(props)
    this.state ={
      chart : defineChart([]),
      isLoaded: false
    }
  }

  componentDidMount() {
    getChartData()
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

  render(){
    return (
      <React.Fragment>
          {this.state.isLoaded ? <Radar data={this.state.chart} /> : <div>Still Loading... </div> }
      </React.Fragment>
    );
  }
}