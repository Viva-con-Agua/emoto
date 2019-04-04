<template>
  <div class="MoodPicture"> 
    <el-row v-if="showMoodPicture">
      <el-col :span="8"><mood-chart  :mood-picture-id="moodPictureId" /></el-col>
      <el-col :span="15">
        <div class="grid-content bg-purple-dark">
          <el-card class="box-card" v-if="moods.positive.length > 0">
            <div slot="header" class="moodPictureDetail">
              <span class="heading">Positiv</span>
            </div>
            <div class="text item">
              <div class="mood" v-for="(m, index) in moods.positive" :key="index">
                <p class="question">{{m.question}}</p>
                <el-tag type="success">{{m.answer}}</el-tag>
                <span v-if="m.comment" class="comment"><i>{{m.comment}}</i></span>
              </div>
            </div>
          </el-card>

           <el-card class="box-card" v-if="moods.neutral.length > 0">
            <div slot="header" class="moodPictureDetail">
              <span class="heading">Neutral</span>
            </div>
            <div class="text item">
              <div class="mood" v-for="(m, index) in moods.neutral" :key="index">
                <p class="question">{{m.question}}</p>
                <el-tag type="warning">{{m.answer}}</el-tag>
                <span v-if="m.comment" class="comment"><i>{{m.comment}}</i></span>
              </div>
            </div>
          </el-card>

          <el-card class="box-card" v-if="moods.negativ && moods.negativ.length > 0">
            <div slot="header" class="moodPictureDetail">
              <span class="heading">Negativ</span>
            </div>
            <div class="text item">
              <div class="mood" v-for="(m, index) in moods.negativ" :key="index">
                <p class="question">{{m.question}}</p>
                <el-tag type="danger">{{m.answer}}</el-tag>
                <span v-if="m.comment" class="comment"><i>{{m.comment}}</i></span>
              </div>
            </div>
          </el-card>
          </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import axios from 'axios'
import store from './../store'

import MoodChart from '@/components/MoodChart'
export default {
  components: {MoodChart},
  props: {
    'moodPictureId':{
      type: Number,
      required: true
  }},
  data () {
    return {
      moods: {},
      date: null,
      showMoodPicture: false,
      user: null,
      crew: null
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
  methods: {
    getIdentity: function(){
      const u = store.getters['user/get']
      const c = store.getters['user/crew']

      if(u === null){
        //init first
        window.location.replace('/emoto/#')
        return Promise.reject()
      }else{
        this.user = u
        this.crew = c
        return Promise.resolve()
      }
    },
    getMoodPicture: function(){
      axios.get('/emotobackend/mood?id=' + this.moodPictureId, {
          headers: {
            'X-EMOTO-USER': this.user,
            'X-EMOTO-CREW': this.crew
          }
        })
      .then(response => {
        switch(response.status){
          case 200: 
            this.moods = response.data.moods
            this.date = response.data.date
            this.showMoodPicture = true
            break
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