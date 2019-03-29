<template>
  <div class="MoodPictureInfo"> 
    <h1>Stimmungsbild</h1>
    <h2>{{date}}</h2>
    <mood-picture :mood-picture-id="moodPictureId" v-if="showMoodPicture"/>
    
  </div>
</template>

<script>

import axios from 'axios'
import store from './../store'

import MoodPicture from '@/components/MoodPicture'
export default {
  components: {MoodPicture},
  props: {
    'id':{
      type: Number,
      required: false,
      default: -1
  }},
  data () {
    return {
      moods: {},
      date: null,
      showMoodPicture: false,
      moodPictureId: 0,
      user: null
    }
  },
  created(){
    this.getIdentity()
    // eslint-disable-next-line
    .then(_ => {
      this.validateMoodPictureId()
    })
    // eslint-disable-next-line
    .catch(_ => {})
  },
  methods: {
    getIdentity: function(){
      const u = store.getters['user/get']
      if(u === null){
        //init first
        window.location.replace('/emoto/#')
        return Promise.reject()
      }else{
        this.user = u
        return Promise.resolve()
      }
    },
    validateMoodPictureId: function(){
      if(this.id === -1){
        return axios.get('/emotobackend/lastMoodPictureId', {
          headers: {
            'X-EMOTO-USER': this.user
          }
        })
          .then(response => {
            switch(response.status){
              case 200:
                this.moodPictureId = response.data.id
                this.showMoodPicture = true;
                return
            }
          })
        
      }else{
        this.moodPictureId = this.id
        this.showMoodPicture = true;
        return Promise.resolve()
      }
    }
  }
}
</script>

<style scoped>
span.heading{
  font-weight: bold;
  font-size: 140%;
}
div.moodPictureDetail{
  text-align: left;
}

div.mood{
  text-align: left;
  padding-bottom:20px;
}

span.comment{
  margin-left:20px;
  font-style: italic;
}
p.question{
  font-weight: bold;
  padding-bottom: 5px;
}
</style>