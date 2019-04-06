<template>
  <div class="MoodPictureInfo"> 
    <h1>Stimmungsbild</h1>
    <h2>{{date}}</h2>
    <p v-if="noMoodPicture"><b>Hinweis: </b> Aktuell liegt noch kein Stimmungsbild von dir vor!</p>
    <mood-picture :mood-picture-id="moodPictureId" v-if="showMoodPicture"/>
    
  </div>
</template>

<script>

import axios from 'axios'
import store from './../store'
import router from './../router'

import MoodPicture from '@/components/MoodPicture'
export default {
  name: 'MoodPictureInfo',
  components: {MoodPicture},
  props: {
    'id':{
      type: Number,
      required: false,
      default: -1
    },
    'notification': {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      moods: {},
      date: null,
      showMoodPicture: false,
      moodPictureId: 0,
      user: null,
      crew: null,
      noMoodPicture: true
    }
  },
  created(){
    if(this.notification){
      this.showNotification()
    }
    
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
      const c = store.getters['user/crew']

      if(u === null){
        //init first
        router.push({name: 'Landing Page'})
        return Promise.reject()
      }else{
        this.user = u
        this.crew = c
        return Promise.resolve()
      }
    },
    validateMoodPictureId: function(){
      if(this.id === -1){
        return axios.get('/emotobackend/lastMoodPictureId', {
          headers: {
            'X-EMOTO-USER': this.user,
            'X-EMOTO-CREW': this.crew
          }
        })
        .then(response => {
          switch(response.status){
            case 200:
              if (response.data !== ''){
                this.moodPictureId = response.data.id
                this.noMoodPicture = false;
                this.showMoodPicture = true;
              }
              return
            }
          })
        .catch(error => {
           switch(error.response.status){
             case 401:
              
              return
           }
        })
        
      }else{
        this.moodPictureId = this.id
        this.showMoodPicture = true;
        return Promise.resolve()
      }
    },
    showNotification() {
        this.$notify({
          title: 'Yeah!',
          message: 'Deine Sitmmung wurde gespeichert!',
          type: 'success'
        });
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