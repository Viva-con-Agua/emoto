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

//Query Param id is optional
app.get('/mood', function (req, res) {
  const id = req.query.id || undefined;
  if(!!id){
    return MoodPictureController.getMoodPictureByIdPreparedForUI(9, id)
    .then(function(m){
      return res.send(m);
    })
    .catch(function(err){
      return res.status(500).send({'error': err.message});
    });
  }else{
    return MoodPictureController.getLastMoodPicturePreparedForUI(9)
    .then(function(moodPicture){
      res.send(moodPicture);
    })
    .catch(function(err){
      return res.status(500).send({'error': err.message});
    });
  }
});

app.get('/moods', function (req, res) {
  let quantity = req.query.quantity || 3;
  return MoodPictureController.getMoodPictures(9, quantity)
  .then(function(m){
    return res.send(m);
  })
  .catch(function(err){
    return res.status(500).send({'error': err.message});
  });
});

app.get('/moods/id', function(req, res){
  const quantity = parseInt(req.query.quantity) || 3;
  const offset = parseInt(req.query.offset) || 0;
  return MoodPictureController.getMoodPictureIds(9, quantity, offset)
  .then(function(response){
    return res.send(response);
  })
  .catch(function(err){
    return res.status(500).send({'error': err.message});
  });
});


app.post('/mood', function (req, res) {
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
  })
  .catch(function(err){
    return res.status(500).send({'error': err.message});
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