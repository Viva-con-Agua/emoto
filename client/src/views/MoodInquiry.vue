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
              <div slot="header" class="question">
                <span >{{item.question}}</span>
              </div>
              <div class="text item">
                <el-form-item>
                  <el-radio-group v-model="form.mood[item.id].answerId">
                    <span v-for="a in item.AnswerSet.Answers" :key="a.id" >
                      <el-radio-button :label="a.id" id="negativ" v-if="a.weight < -1">{{a.answer}}</el-radio-button>
                      <el-radio-button :label="a.id" id="neutral" v-else-if="a.weight == -1 || a.weight == 1">{{a.answer}}</el-radio-button>
                      <el-radio-button :label="a.id" id="positive" v-else-if="a.weight > 1">{{a.answer}}</el-radio-button>
                    </span>
                  </el-radio-group>
                </el-form-item>
                <el-form-item>
                  <el-input type="textarea" placeholder="Was sind die Gründe für deine Stimmung? Hier hast du Platz für deine Kommentare!" v-model="form.mood[item.id].comment"></el-input>
                </el-form-item>
              </div>
            </el-card>
            <el-card class="box-card"  v-for="item in customQuestions" :key="item.id">
              <div slot="header" class="question">
                <p class="close"><el-button v-on:click="removeQuestion(item.id, item.formIndex)" icon="el-icon-close" circle></el-button></p>
                <span> 
                  <el-form-item :rules="[{required: true, message: 'Bitte geb eine Frage an oder lösche das Feld.'}]">
                    <!--<el-input v-model="form.mood[item.formIndex].question" placeholder="Gebe hier deine persönliche Frage an dich selbst ein."></el-input>-->
                    <el-autocomplete 
                      v-model="form.mood[item.formIndex].question"
                      :fetch-suggestions="queryQuestion"
                      @select="handleSelect(item.formIndex)"
                      placeholder="Gebe hier deine persönliche Frage an dich selbst ein."
                      :trigger-on-focus="false">
                    </el-autocomplete>
                  </el-form-item>
                </span>
              </div>
              <div class="text item">
                <el-form-item :rules="[
                  { required: true, message: 'Bitte geb eine Antwort an oder lösche die Frage.'},
                ]">
                  <el-radio-group v-model="form.mood[item.formIndex].answerId" required>
                    <span v-for="a in item.questionObj.AnswerSet.Answers" :key="a.id" >
                      <el-radio-button :label="a.id" id="negativ" v-if="a.weight < -1">{{a.answer}}</el-radio-button>
                      <el-radio-button :label="a.id" id="neutral" v-else-if="a.weight == -1 || a.weight == 1">{{a.answer}}</el-radio-button>
                      <el-radio-button :label="a.id" id="positive" v-else-if="a.weight > 1">{{a.answer}}</el-radio-button>
                    </span>
                  </el-radio-group>
                </el-form-item>
                <el-form-item>
                  <el-input type="textarea" placeholder="Was sind die Gründe für deine Stimmung? Hier hast du Platz für deine Kommentare!" v-model="form.mood[item.formIndex].comment"></el-input>
                </el-form-item>
              </div>
            </el-card>
          </div>
          <el-button v-on:click="addQuestion()" icon="el-icon-plus">Füge eine eigene Frage hinzu.</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark submit">
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
import store from './../store'
import router from './../router'


Vue.use(Form);
Vue.use(FormItem);

export default {
  name: 'MoodInquiry',
  data () {
    return {
      question: Object,
      questions: Array,
      questionBacklog: Array,
      customQuestions: Array(),
      customQuestionsId: -1,
      answers: Array,
      form: {
        mood: Array
      },
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
      this.getMoodInquiry()
    })
    // eslint-disable-next-line
    .catch(_ => {})
  },
  methods: {
    queryQuestion: function(query, cb){
      var questions = this.questionBacklog;
      var results = query ? questions.filter(this.questionFilter(query)) : questions;
      var top3 = results.slice(0, 3);
      cb(top3); // number of things returned
    },
    questionFilter(query) {
      return (o) => {
        return o.value.toLowerCase().includes(query.toLowerCase());
      };
    },
    handleSelect(index) {
      const q = this.form.mood[index].question;
      const getQuestion = this.questionBacklog.find(question => question.value === q);
      this.form.mood[index].questionId = getQuestion.questionId
    },
    getMoodInquiry: function(){
      axios.get('/emotobackend/moodInquiry', {
          headers: {
            'X-EMOTO-USER': this.user,
            'X-EMOTO-CREW': this.crew
          }
        })
        .then(response => {
                switch (response.status) {
                  case 200:{
                    let questions = []
                    let questionBacklog = []
                    //create json object for the vue form
                    let mood = [];
                    response.data.forEach(function(q){                    
                      if(q.userId === null){
                        
                        let data = {
                          'questionId': q.id,
                          'answerId': null,
                          'comment': null
                        };
                        mood[q.id]=data;
                        questions.push(q);
                      }else{
                        const data = {
                          'questionId': q.id,
                          'value': q.question, //name condition by auto complete function
                          'answerSetId': q.answerSetId
                        }
                        questionBacklog.push(data);
                      }
                    });
                    this.form.mood = mood;
                    this.questions = questions;
                    this.questionBacklog = questionBacklog;

                    //Create Question Template
                    this.question = Object.assign({}, this.questions[0]);
                    delete this.question.UserId;
                    delete this.question.createdAt;
                    delete this.question.updatedAt;
                    this.question.id = -1;
                    this.question.question = "";

                    break
                  }
                }
              }).catch(error => {
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
    //ToDo add crew
    getIdentity: function(){
      const u = store.getters['user/get']
      const c = store.getters['user/crew']

      if(u === null){
        //init first
        //window.location.replace('/emoto/#')
        return Promise.reject()
      }else{
        this.user = u
        this.crew = c
        return Promise.resolve()
      }
    },
    onSubmit: function(){
      const body = this.createRequestBodyFromForm(this.form.mood);
      axios.post('/emotobackend/mood', body,
        {
          headers: {
            'X-EMOTO-USER': this.user,
            'X-EMOTO-CREW': this.crew
          }
        })
      .then(response => {
        if(response.status === 200){
          this.dialogSuccessVisible = true;
          router.push({name: "Mood Picture", params: {notification: true }})

        }else{
          this.dialogErrorVisible = true;
        }
      })
      .catch((err) => {
        this.error=err.response.data.error;
        this.dialogErrorVisible = true;
      });
    },
    addQuestion: function(){
      const q = {
        answerId: null,
        question: "",
        questionId: this.customQuestionsId,
        comment: null,
        questionObj: Object.assign({}, this.question),
        formIndex: this.form.mood.length
      };
      this.customQuestions.push(Object.assign({}, q));
      
      const m = {
        'questionId': this.customQuestionsId,
        'answerId': null,
        'comment': null,
        question: null
      }
      
      this.form.mood.push(Object.assign({}, m));
      this.customQuestionsId--;
    },
    removeQuestion: function(deleteIndex, formIndex){
        //Delete from Form Model
        //Vue.delete(this.form.mood, formIndex)
        //Delete by setting a empty object
        Vue.set(this.form.mood, formIndex, {});
        
        //Delete from Custom Questions Colleciton
        let q = this.customQuestions;
        q.splice(deleteIndex, 1);
        this.customQuestions = q;
    },
    createRequestBodyFromForm(formData){
      //Drop all empty objects from the form 
      const f = formData.filter(i => Object.keys(i).length !== 0);

      const data = {
        user: this.user,
        mood: []
      };
      f.forEach(function(e){
        data.mood.push(Object.assign({}, e))
      })
      return data;
    }
  }
}
</script>
<style scoped>
  div.MoodInquiry{
    padding: 10px;
  }
  
  div.question{
    text-align: left;
  }
  div.submit{
    text-align: right;
  }

  p.close{
    width: 100%;
    text-align:right;
    margin: 5px;
  }
  div.el-autocomplete{
    width: 100% 
  }

</style>