<template>
  <div class="MoodChart"> 
      <apexchart type=bar height=350 :options="chartOptions" :series="series" />
  </div>
</template>

<script>

import axios from 'axios'
//import Vue from 'vue'
import VueApexCharts from 'vue-apexcharts'
import { mkdir } from 'fs';
export default {
  name: 'MoodChart',
  data () {
    return {
      series: [],
      chartOptions: {
        chart: {
          stacked: true,
          stackType: '100%'
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
          opacity: 1
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
      axios.get('http://localhost:3000/lastMoodPicture')
      .then(response => {
        switch(response.status){
          case 200: {
            console.log(response.data.percent)
            
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

</style>