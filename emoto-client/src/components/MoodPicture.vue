<template>
  <div class="MoodInquiry">
    {{moodPicutre}}
  </div>
</template>

<script>

import axios from 'axios'
import Vue from 'vue'

export default {
  name: 'MoodPicture',
  data (){
    return {
      moodPicutre: null
    }
  },
  created(){
    this.getMoodPicutre
  },
  methods: {
    getMoodPicutre: function(){
      axios.get('http://localhost:3000/lastMoodPicture')
      .then(response => {
        switch(response.status){
          case 200: 
            this.moodPicutre = response.data
            break
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