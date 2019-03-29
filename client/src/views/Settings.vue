<template>
  <div class="Settings">
    <h1> Allgemeine Informationen</h1>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span><strong>Wichtiger Hinweis</strong></span>
      </div>
      <div  class="text item">
        Solltest du in deinem Ehrenamt frustiert sein, oder sollte es andere Themen geben bei denen du Unterstützung brauchst, wende dich an das Brunnenbüro oder die Ansprechperson für den Bereich Netzwerk in deiner Crew.
        EMOTO ist lediglich für die persönliche Dokumentation deiner Stimmung da. 
      </div>
    </el-card>
    <p>
      EMOTO ist ein Stimmungsbarometer, welches es dir ermöglicht deine Stimmung im Bezug auf dein Ehrenamt für VcA zu dokumentieren.
      Durch die Dokumentation deiner Stimmung sollst du dazu motiviert werden, dein Ehrenamt aktiver zu reflektieren und bewusster wahr zu nehmen. 
    </p>
    <p>
      Für die Abfrage deiner Stimmung gibt EMOTO drei Fragen vor. 
      Es steht dir hierbei offen, wie viele dieser Fragen du beantwortest. 
      Zusätztlich hast du die Möglichkeit eigenen Fragen, für Themen die bei dir aktuelle präsent sind, anzugeben. 
      Diese Fragen sind für dich und werden nicht den anderen Supporter*innen angezeigt.
    </p>
    <p>
      Neben der Dokumentation deiner Stimmung, zeigt die EMOTO den Verlauf deiner Stimmung an. Hierdurch sollst du negative Entwicklungen früher erkennen um bei Bedarf zu agieren.
    </p>
    <p>
      EMOTO wurde im Rahmen mehrer Forschungsarbeiten und in Zusammenarbeit mit mehreren Supporter*innen von VcA erarbeitet und befindet sich aktuell in einer ersten Testphase. Die Testphase wird durch eine Masterarbeit begleitet. 
    </p>
    

    <h1> Datenschutz</h1>

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
        <el-button type="primary" @click="onSubmit">Speichern</el-button>
        <el-button @click="reset">Zurücksetzen</el-button>
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
import Vue from 'vue'

import {
    Form,
    FormItem
} from 'element-ui'

Vue.use(Form);
Vue.use(FormItem);

export default {
  name: 'Settings',
  data() {
    return {
      form:{
        statisticalAnalysis : false,
        contentAnalysis: false
      },
      //stored values, needed for form reset
      statisticalAnalysis: false,
      contentAnalysis: false,
      user: null,
      dialogSuccessVisible: false,
      dialogErrorVisible: false,
      error: null
    }
  },
  created () {
    
    this.getIdentity()
    // eslint-disable-next-line
    .then(_ => {
      this.getCurrentSettings()
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
    getCurrentSettings: function(){
      axios.get('/emotobackend/user', {
        headers: {
          'X-EMOTO-USER': this.user
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
      });
    },
    reset: function(){
      this.form.statisticalAnalysis = this.statisticalAnalysis;
      this.form.contentAnalysis = this.contentAnalysis;
    },
    onSubmit: function(){
      axios.post('/emotobackend/settings', this.form, {
          headers: {
            'X-EMOTO-USER': this.user
          }
      })
      .then(response => {
        if(response.status === 200){
          this.statisticalAnalysis = response.data.statisticalAnalysis;
          this.contentAnalysis = response.data.contentAnalysis;
          this.dialogSuccessVisible = true;
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