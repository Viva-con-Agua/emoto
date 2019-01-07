<template>
  <div class="MoodChart" > 
      <h2>{{date}}</h2>
      <div class="chart" :style="{ backgroundImage: 'url(' + image + ')' }">
        <apexchart  type=bar height=300 width=150 :options="chartOptions" :series="series" />
      </div>
  </div>
</template>

<script>

import axios from 'axios'
//import Vue from 'vue'
import VueApexCharts from 'vue-apexcharts'
export default {
  name: 'MoodChart',
  props: {
    'moodPictureId':{
      type: Number,
      required: true
  }},
  data () {
    return {
      image: './img/soule_bottle.png',
      series: [],
      date: null,
      chartOptions: {
        chart: {
          stacked: true,
          stackType: '100%'
        },
        dataLabels: {
          style: {
            colors: ['#000000', '#000000', '#000000']
          }
        },
        responsive: [{
          breakpoint: 480
        }],
        grid: {
          show: false
        },
        xaxis: {
          labels: {
            show: false
          },
          categories: ['01.10.2018']
        },
        yaxis: {
          labels: {
            show: false
          }
        },
        fill: {
          opacity: 0.5
        },

        legend: {
          show: false
        },
        colors: ['#FF6347', '#FFFF00', '#32CD32']
      }
    }
  },
  created(){
    this.getMoodPicture()
  },
  components: {
        apexchart: VueApexCharts,
  },
  methods: {
    getMoodPicture: function(){
      this.loaded = false
      axios.get('http://localhost:3000/mood?id=' + this.moodPictureId)
      .then(response => {
        switch(response.status){
          case 200: {    
            this.date = response.data.date       
            this.series.push({
              name: 'Negativ',
              data: [response.data.percent.negativ]
            });
              
            this.series.push({
              name: 'Neutral',
              data: [response.data.percent.neutral]
            });
          
            this.series.push({
              name: 'Positiv',
              data: [response.data.percent.positive]
            });
            break
          }
        }
      })
      .catch(error => {
                if(error.response){
                  this.errorState = error.response.status
                }
      })
    }
  }
}

</script>


<style scoped>
div.chart{
  background-repeat: no-repeat;
  background-size: contain;
  height:400px;
  padding-top:100px;
  padding-left:100px;
}
</style>