<template>
  <div class="MoodCourse"> 
    <h1>Stimmungsverlauf</h1>
    <el-row>
      <el-col :span="2"><button :disabled='offset === 0'  v-on:click="left">Neuere</button></el-col>
      <el-col :span="7" v-for="(id, index) in moodPictureIds" :key="index"><div id="link-container" @click="openMoodPictureDialog(id)"> <mood-chart  :mood-picture-id="id" :key="reload"/></div></el-col>
      <el-col :span="1"><button :disabled=" offset >= (count - quantity)"  v-on:click="right">Ältere</button></el-col>
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
      dialogMoodPicture: false,
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
      if(u === null){
        //init first
        window.location.replace('/emoto/#')
        return Promise.reject()
      }else{
        this.user = u
        return Promise.resolve()
      }
    },
    getMoodPictureIds: function(){
      const url ='/emotobackend/moods/id?offset='+this.offset+'&quantity='+this.quantity
      axios.get(url, {
          headers: {
            'X-EMOTO-USER': this.user
          }
        })
      .then(response => {
        switch(response.status){
          case 200: {  
            this.moodPictureIds = []
            for (var i = 0; i < response.data.id.length; i++) {
              this.$set(this.moodPictureIds, i, response.data.id[i])
            }
            
            this.count = response.data.count
            this.reload++
            break;
          }
        }
      })
       .catch(error => {
                if(error.response){
                  this.errorState = error.response.status
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
p.arrow{
  font-size: 50px;
}

#link-container{
  cursor: pointer; 
}
</style>