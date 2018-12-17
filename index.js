"use strict";


const express = require('express');
const app = express();

const bodyparser = require('body-parser');

const QuestionsController = require('./server/controller/QuestionController');
const AnswerController = require('./server/controller/AnswerController');
const MoodInquiryController = require('./server/controller/MoodInquiryController');
const MoodPictureController = require('./server/controller/MoodPictureController');

const cors = require('cors');
app.use(cors());

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: false
}));


app.get('/', function (req, res) {
  return res.send('emoto is running');
});

app.get('/mood', function (req, res) {
  return res.status(501);
});

app.get('/moods', function (req, res) {
  return res.status(501);
});

app.post('/mood', function (req, res) {
  console.log(req.body);
  return MoodPictureController.createMoodPicture(req.body)
  .then(function(m){
    return res.send(m);
  })
  .catch(function(err){
    return res.status(500).send({'error': err.message});
  });
});

app.get('/lastMoodPicture', function(req, res){
  return MoodPictureController.getLastMoodPicturePreparedForUI(9)
  .then(function(moodPicture){
    res.send(moodPicture);
  });
});

app.get('/questions', function(req, res){
  return QuestionsController.getAllPublic()
  .then(function(questions){
    return res.send(questions);
  });
});

app.get('/answers', function(req, res){
  return AnswerController.getAll()
  .then(function(answers){
    return res.send(answers);
  });
});

app.get('/moodInquiry', function(req, res){
  return MoodInquiryController.getBasicMoodInquiry()
  .then(function(moodInquiry){
    return res.send(moodInquiry);
  });
});

app.get('/crewmood', function (req, res) {
  return res.status(501);
});

app.get('/crewmoods', function (req, res) {
  return res.status(501);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});