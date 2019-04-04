<template>
  <div class="LandingPage" v-loading.fullscreen.lock="pending">
     <el-row class="wrapper">
      <el-col :span="16">
        <info v-if="!pending && access"/>
      </el-col>
      <el-col class="img" :span="8" >
        <img v-if="!pending && access" src="/emoto/img/mood_sample.png" />
      </el-col>
    </el-row>
    <privacy-settings v-if="!pending && access"
      submit-btn = "Ich habe alles gelesen und möchte mit EMOTO starten!"
      v-bind:user-required="false"
      v-bind:reset-btn="false"
      redirect = "/mood/form"
    />

    <div v-if="!pending && !access">
        <h1>Zugriff verweigert</h1>
        <p> EMOTO befindet sich aktuell in einer Testphase. Leider gehörst du der Testgruppe (noch) nicht an.</p> 
    </div>
  </div>
</template>

<script>
import Info from '@/components/Info'
import PrivacySettings from '@/components/PrivacySettings'

import axios from 'axios'
import router from './../router'

export default {
  name: 'Settings',
  components: {Info, PrivacySettings},
  data() {
   return {
     pending: true,
     access: false
   }
  },
  created () {
    this.getIdentity()
    // eslint-disable-next-line
    .then(_ => {
      this.validateAccess();
    })
    // eslint-disable-next-line
    .catch(_ => {})
  },
  methods: {
     getIdentity: function(){
       return axios.get('/drops/webapp/identity', {
        headers: {
          "Access-Control-Allow-Credentials": "true"
        }
      })
      .then(response => {
          this.userId = response.data.additional_information.id;
          this.email = response.data.additional_information.profiles[0].email;
          this.crewId = response.data.additional_information.profiles[0].supporter.crew.id;
      })
    },
    validateAccess(){
      axios.post('/emotobackend/user/access', {
        userId: this.userId,
        email: this.email
      })
      .then(response => {
        if(response.status === 200){
          if(response.data.active){
            router.push("/mood/form")
          }else{
            this.access = response.data.access;
            this.pending = false
          }
        }else{
          throw new Error(response.data)
        }
      })
       .catch((err) => {
        this.error=err.response.data.error;
        this.dialogErrorVisible = true;
      });

    }
  }
}
</script>

<style scoped>
p {
  text-align:left;
}

div.img {
  padding-top: 100px;
}
</style>