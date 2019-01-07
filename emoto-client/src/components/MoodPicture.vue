<template>
  <div class="MoodPicture"> 
    <h1> Last Mood</h1>
    <el-row>
      <el-col :span="8" v-for="(id, index) in moodPictureIds" :key="index"><mood-chart :mood-picture-id="id" /></el-col>
    </el-row>
  </div>
</template>

<script>

import axios from 'axios'
import MoodChart from '@/components/MoodChart'
export default {
  components: {MoodChart},
  data () {
    return {
      moodPictureIds:[]
    }
  },
  created(){
    this.getMoodPictureIds()
  },
  methods: {
    getMoodPictureIds: function(){
      axios.get('http://localhost:3000/moods/id')
      .then(response => {
        switch(response.status){
          case 200: {  
            this.moodPictureIds = response.data.id
            break;
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