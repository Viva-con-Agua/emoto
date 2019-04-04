<template>
  <div class="PrivacySettings">
    <h1> Datenschutz Einstellungen</h1>

    <p>Im Rahmen der Testphase, sollen gewisse Auswertung der Daten erfolgen. Du kannst selbst frei entscheiden, ob du deine Daten für diese Auswertungen zur Verfügung stellen möchtest. Diese Einstellung kannst du im Lauf der Testphase ändern. Die Datenauswertungen werden im Rahmen einer Masterarbeit veröffentlicht und auf dem NWT im Rahmen eines Workshops in Teilen präsentiert. Bei der Auswertung der Daten wird wie folgt unterschieden:
    
    <ul>
      <li><strong>anonymisierte statistische Auswertungen: </strong> Bei diesen Auswertungen werden primär numerische Werte betrachtet. Es geht beispielsweise darum zu untersuchen wie oft eine Person eine Stimmung dokumentiert hat oder wie oft ein Stimmungsbild angeschaut wurde.</li>
      <li><strong>anonymisierte inhaltliche Auswertungen: </strong>Bei diesen Auswertungen werden mehr die inhalte angeschaut. So könnte beispielsweise eine Gesamtstimmung über den Testzeitraum hinweg abgeleitet werden. </li>
    </ul>
    </p>

    <p>Meine Daten dürfen genutzt werden für: </p>
    <el-form ref="form" :model="form">
      <el-form-item label="Anonymisierte statische Auswertungen">
        <el-switch v-model="form.statisticalAnalysis"></el-switch>
      </el-form-item>
      <el-form-item label="Anonymisierte inhaltliche Auswertung">
        <el-switch v-model="form.contentAnalysis"></el-switch>
      </el-form-item>
    
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{this.submitBtn}}</el-button>
        <el-button v-if="resetBtn" @click="reset">Zurücksetzen</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      title="Stimmungsbild"
      :visible.sync="dialogSuccessVisible"
      width="30%">
      <span>Deine Einstellungen wurde gespeichert</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogSuccessVisible = false">Schließen</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="Stimmungsbild"
      :visible.sync="dialogErrorVisible"
      width="30%">
      <span>Deine Einstellungen wurde <strong>nicht</strong> gespeichert. Grund: <i>{{error}}</i></span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogErrorVisible = false">Schließen</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import store from './../store'
import router from './../router'

import Vue from 'vue'


import {
    Form,
    FormItem
} from 'element-ui'

Vue.use(Form);
Vue.use(FormItem);

export default {
  name: 'PrivacySettings',
  props: {
    'submitBtn': {
      type: String,
      required: false,
      default: "Einstellungen speichern"
    },
    'resetBtn': {
      type: Boolean,
      required: true
    },
    'userRequired': {
      type: Boolean,
      required: true
    },
    'redirect': {
      type: String,
      required: false
    }
  },
  data() {
    return {
      form:{
        statisticalAnalysis : false,
        contentAnalysis: false,
        isActive: true
      },
      //stored values, needed for form reset
      statisticalAnalysis: false,
      contentAnalysis: false,
      user: null,
      crew: null,
      dialogSuccessVisible: false,
      dialogErrorVisible: false,
      error: null
    }
  },
  created () {
    this.getIdentity()
    // eslint-disable-next-line
    .then(_ => {
      if(this.userRequired){
        this.getCurrentSettings()
      }else{
        return Promise.resolve()
      }
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
    getCurrentSettings: function(){
      axios.get('/emotobackend/user', {
        headers: {
          'X-EMOTO-USER': this.user,
          'X-EMOTO-CREW': this.crew
        }
      })
      .then(response => {
        if(response.status === 200){
          this.form.statisticalAnalysis = response.data.statisticalAnalysis;
          this.form.contentAnalysis = response.data.contentAnalysis;
          this.statisticalAnalysis = response.data.statisticalAnalysis;
          this.contentAnalysis = response.data.contentAnalysis;
        }else{
          throw new Error(response.data)
        }
      })
       .catch((err) => {
        this.error=err.response.data.error;
        this.dialogErrorVisible = true;
        switch(err.response.status){
                  case 401:
                    window.location.replace('/emoto')
                    return
                }
      });
    },
    reset: function(){
      this.form.statisticalAnalysis = this.statisticalAnalysis;
      this.form.contentAnalysis = this.contentAnalysis;
    },
    onSubmit: function(){
      axios.post('/emotobackend/settings', this.form, {
          headers: {
            'X-EMOTO-USER': this.user,
            'X-EMOTO-CREW': this.crew
          }
      })
      .then(response => {
        if(response.status === 200){
          this.statisticalAnalysis = response.data.statisticalAnalysis;
          this.contentAnalysis = response.data.contentAnalysis;
          this.dialogSuccessVisible = true;

          if(this.redirect !== undefined){
            router.push(this.redirect)
          }
        }else{
          this.dialogErrorVisible = true;
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
</style>