<template>
  <div class="MoodChart" > 
    <div class="wrapper" ref="wrapper"  v-bind:style="{ backgroundImage: 'url(' + image + ')', height: wrapperStyle.height + 'px' } " >
      <div class="chart" v-bind:style="{ width: chartStyle.width + 'px', height: chartStyle.height + 'px', 'padding-top': chartStyle.top + 'px'}" >
        <apexchart  type=bar :options="chartOptions" :height="chartSvgStyle.height" :series="series" v-if="showDiagramm"/>
      </div>
      <resize-observer @notify="handleResize" />
     </div>
      <span>{{date}}</span>
  </div>
  
</template>

<script>
import Vue from 'vue'

import axios from 'axios'
import store from './../store'
import router from './../router'
//import Vue from 'vue'
import VueApexCharts from 'vue-apexcharts'

import 'vue-resize/dist/vue-resize.css'
import VueResize from 'vue-resize'

Vue.use(VueResize)

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
      showDiagramm: false,
      user: null,
      crew: null,
      wrapperStyle:{
        height: 0
      },
      chartStyle: {
        width: 100,
        height: 100,
        left: 0,
        top: 0
      },
      chartSvgStyle: {
        height: 100
      },
      chartOptions: {
        chart: {
          stacked: true,
          stackType: '100%',
          height: '454px',
          offsetX: 0,
          offsetY: 0,
          toolbar: {
            show: false
          }
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
    this.getIdentity()
    // eslint-disable-next-line
    .then(_ => {
      this.getMoodPicture()
    })
    // eslint-disable-next-line
    .catch(_ => {})
    
  },
  mounted (){
    this.defineStyleAndSizes();
  },
  components: {
        apexchart: VueApexCharts,
  },
  methods: {
    handleResize: function(){
      this.defineStyleAndSizes();
    },
    defineStyleAndSizes: function(){

      //ToDo Irgendwas stimmt da noch nicht oder ergibt keinen Sinn!
      const factorHeight = 2.895136778;
      //const factorTop = 0.358005249;
      const factorTop = 0.33;
      //const factorBottom = 0.955380577;
      const factorBottom = 1;
      
      const {
        width,
        // eslint-disable-next-line
        _
      } = this.$refs.wrapper.getBoundingClientRect();

      let height = width*factorHeight
      this.wrapperStyle.height = height
      const top = height * factorTop
      const bottom = height - height * factorBottom
      this.chartSvgStyle.height = height - top - bottom
      
      height -= top
    
      this.chartStyle.width = width
      this.chartStyle.height = height
      this.chartStyle.top = top
      this.showDiagramm = true
    },
    getIdentity: function(){
      const u = store.getters['user/get']
      const c = store.getters['user/crew']

      if(u === null){
        //init first
        router.push({name: "Landing Page"});
        return Promise.reject()
      }else{
        this.user = u
        this.crew = c
        return Promise.resolve()
      }
    },
    getMoodPicture: function(){
      this.loaded = false
      //work with relative path= backend/emoto/mood?id
      axios.get('/emotobackend/mood?id=' + this.moodPictureId, {
          headers: {
            'X-EMOTO-USER': this.user,
            'X-EMOTO-CREW': this.crew
          }
        })
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
                  switch(error.response.status){
                  case 401:
                    window.location.replace('/emoto')
                    return
                }
                }
      })
    },
    calculateSizes: function(){

    }

  }
}

</script>


<style scoped>
div.wrapper{
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;  
}

</style>