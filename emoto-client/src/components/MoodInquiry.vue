<template>
  <div class="MoodInquiry">
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <h1>Stimmungsabfrage</h1>
        </div>
      </el-col>
    </el-row>
    <el-form ref="form" :model="form">
      <el-row>
        <el-col :span="24">
            <div class="grid-content bg-purple-dark">
            <el-card class="box-card"  v-for="item in questions" :key="item.id">
              
              <div slot="header" class="clearfix">
                <span>{{item.question}}</span>
              </div>
              <div class="text item">
                <el-form-item>
                    <el-radio-group v-model="form.mood[item.id].answerId">
                      <el-radio-button v-for="a in item.AnswerSet.Answers" :key="a.id" :label="a.id">{{a.answer}}</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item>
                    <el-input type="textarea" placeholder="Bla bla Notiz und so" v-model="form.mood[item.id].comment"></el-input>
                  </el-form-item>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple-dark">
            <el-form-item>
              <el-button type="primary" @click="onSubmit">Stimmung speichern</el-button>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog
      title="Stimmungsbild"
      :visible.sync="dialogSuccessVisible"
      width="30%">
      <span>Deine Sitmmung wurde gespeichert</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogSuccessVisible = false">Schließen</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="Stimmungsbild"
      :visible.sync="dialogErrorVisible"
      width="30%">
      <span>Deine Sitmmung wurde <strong>nicht</strong> gespeichert. Grund: <i>{{error}}</i></span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogErrorVisible = false">Schließen</el-button>
      </span>
    </el-dialog>
  </div>
</template>



<script>

import axios from 'axios'
import Vue from 'vue'
import {
    Form,
    FormItem
} from 'element-ui'

Vue.use(Form);
Vue.use(FormItem);

export default {
  name: 'MoodInquiry',
  data () {
    return {
      questions: [],
      answers: [],
      form: {
        mood: []
      },
      user: 9,
      dialogSuccessVisible: false,
      dialogErrorVisible: false,
      error: null
    }
  },
  created () {
    this.getMoodInquiry()
  },
  methods: {
    getMoodInquiry: function(){
      axios.get('http://localhost:3000/moodInquiry')
        .then(response => {
                switch (response.status) {
                  case 200:{
                    this.questions = response.data
                    //create json object for the vue form
                    let mood = [];
                    this.questions.forEach(function(q){
                      let data = {
                        'questionId': q.id,
                        'answerId': null,
                        'comment': null
                      };
                      
                      mood[q.id]=data;
                    });
                    this.form.mood = mood;
                    break
                  }
                }
              }).catch(error => {
                if(error.response){
                  this.errorState = error.response.status
                }
              })
    },
    onSubmit: function(){
      const body = this.createRequestBodyFromForm(this.form.mood);
      axios.post('http://localhost:3000/mood', body)
      .then(response => {
        if(response.status === 200){
          this.dialogSuccessVisible = true;
        }else{
          this.dialogErrorVisible = true;
        }
      })
      .catch((err) => {
        this.error=err.response.data.error;
        this.dialogErrorVisible = true;
      });
    },
    createRequestBodyFromForm(formData){
      const data = {
        user: this.user,
        mood: []
      };
      formData.forEach(function(e){
        data.mood.push(Object.assign({}, e))
      })
      return data;
    }
  }
}
</script>
<style scoped>

</style>