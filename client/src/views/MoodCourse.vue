<template>
  <div class="MoodCourse"> 
    <h1>Stimmungsverlauf</h1>
    <p v-if="noMoodPictures"><b>Hinweis: </b> Aktuell liegt noch kein Stimmungsbild von dir vor!</p>
    <el-row class="wrapper" v-if="!noMoodPictures">
      <el-col :span="3" class="arrow">
        <el-button class="arrow" v-on:click="left()" :disabled='offset === 0' icon="el-icon-caret-left"></el-button>
      </el-col>
      <el-col :span="6" v-for="(id, index) in moodPictureIds" :key="index"><div id="link-container" @click="openMoodPictureDialog(id)"> <mood-chart  :mood-picture-id="id" :key="reload"/></div></el-col>
      <el-col :span="3" class="arrow">
        <el-button class="arrow" v-on:click="right()" :disabled=" offset >= (count - quantity)" icon="el-icon-caret-right"></el-button>
      </el-col>
      <el-dialog
      title="Stimmungsbild"
      :visible.sync="dialogMoodPicture"
      width="70%">
      <span slot="footer" class="dialog-footer">
        <mood-picture :key="dialogId" :mood-picture-id="dialogId" v-if="dialogId!=0"/>
        <el-button @click="dialogMoodPicture = false">Schließen</el-button>
      </span>
    </el-dialog>
    </el-row>
  </div>
</template>

<script>

import axios from 'axios'
import store from './../store'
import router from './../router'

import MoodChart from '@/components/MoodChart'
import MoodPicture from '@/components/MoodPicture'

export default {
  components: {MoodChart, MoodPicture},
  data () {
    return {
      moodPictureIds:[],
      offset: 0,
      count: 0,
      reload: 0,
      quantity: 3,
      user: null,
      crew: null,
      dialogMoodPicture: false,
      noMoodPictures: true,
      dialogId: 0
    }
  },
  created(){
    this.getIdentity()
    // eslint-disable-next-line
    .then(_ => {
      this.getMoodPictureIds()
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
    getMoodPictureIds: function(){
      const url ='/emotobackend/moods/id?offset='+this.offset+'&quantity='+this.quantity
      axios.get(url, {
          headers: {
            'X-EMOTO-USER': this.user,
            'X-EMOTO-CREW': this.crew
          }
        })
      .then(response => {
        switch(response.status){
          case 200: {  
            this.moodPictureIds = []
            if(response.data.id.length > 0){
              for (var i = 0; i < response.data.id.length; i++) {
                this.$set(this.moodPictureIds, i, response.data.id[i])
              }
              
              this.count = response.data.count
              this.noMoodPictures = false
              this.reload++
            }else{
              this.noMoodPictures = true
            }
            break;
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
    openMoodPictureDialog: function(id){
      this.dialogId = id
      this.dialogMoodPicture = true

    },
    left: function(){
      this.offset--
      this.getMoodPictureIds()
    },
    right: function(){
      this.offset++
      this.getMoodPictureIds()
    }
  }
}
</script>

<style scoped>
#link-container{
  cursor: pointer; 
}

div.wrapper{
  display:flex;
}
div.arrow{
  flex: 1;
}

button.arrow{
  height: 100%;
  font-size: 40px;
  margin: 0;
  padding: 0;
}
</style>