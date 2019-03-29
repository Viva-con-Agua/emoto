"use strict";


const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();

const bodyparser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const validateUUID = require('uuid-validate');
const morgan = require('morgan');

const QuestionsController = require('./src/controller/QuestionController');
const AnswerController = require('./src/controller/AnswerController');
const MoodInquiryController = require('./src/controller/MoodInquiryController');
const MoodPictureController = require('./src/controller/MoodPictureController');
const OAuth2Controller = require('./src/controller/OAuth2Controller');
const UserController = require('./src/controller/UserController');
const UserIdHelper = require('./src/helper/UserIdHelper');
const MoodPictureHelper = require('./src/helper/MoodPictureHelper');

const USER_ID_HEADER_FIELDNAME = 'X-EMOTO-USER'.toLowerCase();
const CREW_ID_HEADER_FIELDNAME = 'X.EMOTO-CREW'.toLowerCase();

const PORT = 3000;
const HOST = '0.0.0.0';

app.use(cors());
app.use(morgan('combined'));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: false
}));

app.use(cookieParser());

app.use(function(req,res,next){
  if(req.headers[USER_ID_HEADER_FIELDNAME]){
    const id = req.headers[USER_ID_HEADER_FIELDNAME];
    if(!validateUUID(id)){
      return res.status(500).send({'error': 'invalid data type for user id'});
    }
    return UserIdHelper.translateId(id)
    .then(function(internalID){
      req.user = internalID;
      next();
    });
  }else{
    next();
  }
});

app.all('/emoto*', function(req, res, next){
  //http://localhost/emoto/subpath
  req.url = req.url.replace(/^\/emoto\//, '/');
  //http://localhost/emoto
  req.url = req.url.replace(/^\/emoto/, '/');
  return next();
});

app.get('/', function (req, res) {
  return res.send('emoto is running');
});

//ToDo: Test Call with Cookies
//Not in use currently
app.get('/identity', function (req, res) {
  return axios.get('http://localhost/drops/webapp/identity',{withCredentials: true})
  .then(function(response){
    console.log("SUCCESS");
    return res.send(response);
  })
  .catch(function(err){
    console.log("ERROR");
    console.log(err.request.cookies);
    return res.status(err.response.status).send(err.response.data);
  });
});

//Query Param id is optional
app.get('/mood', function (req, res) {
  const id = req.query.id || undefined;
  if(!!id){
    return MoodPictureController.getMoodPictureByIdPreparedForUI(req.user, id)
    .then(function(m){
      return res.send(m);
    })
    .catch(function(err){
      return res.status(500).send({'error': err.message});
    });
  }else{
    return MoodPictureController.getLastMoodPicturePreparedForUI(req.user)
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
  return MoodPictureController.getMoodPictures(req.user, quantity)
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
  if(offset < 0 || quantity < 0) throw Error('invalid value');
  return MoodPictureController.getMoodPictureIds(req.user, quantity, offset)
  .then(function(response){
    return res.send(response);
  })
  .catch(function(err){
    return res.status(500).send({'error': err.message});
  });
});


app.post('/mood', function (req, res) {
  console.log(req.body);
  let userId = 0;
  return UserIdHelper.translateId(req.body.user, null)
  .then(function(id){
    userId = id;
    return MoodPictureHelper.handleCustomQuestions(id, req.body.mood);
  })
  .then(function(moods){
    return MoodPictureController.createMoodPicture({user: userId, mood: moods});
  })
  .then(function(m){
    return res.send(m);
  })
  .catch(function(err){
    return res.status(500).send({'error': err.message});
  });
});

app.get('/lastMoodPicture', function(req, res){
  return MoodPictureController.getLastMoodPicturePreparedForUI(req.user)
  .then(function(moodPicture){
    res.send(moodPicture);
  })
  .catch(function(err){
    return res.status(500).send({'error': err.message});
  });
});

app.get('/lastMoodPictureId', function(req, res){
  return MoodPictureController.getLastMoodPictureId(req.user)
  .then(function(data){
    res.send(data);
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
  return MoodInquiryController.getCustomMoodInquiry(req.user)
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

app.post('/settings', function(req, res){
  console.log(req.user);
  return Promise.resolve()
  .then(function(){
    if(req.body.statisticalAnalysis === undefined 
    || req.body.contentAnalysis === undefined){
        throw Error('no correct request body');
      }
    
    return Promise.resolve({
        statisticalAnalysis : req.body.statisticalAnalysis,
        contentAnalysis: req.body.contentAnalysis
      });
  })
  .then(function(settings){
    console.log(settings);
    return UserController.setSettings(req.user, settings);
  })
  .then(function(user){
    return res.send(user);
  })
  .catch(function(err){
    return res.status(500).send({'error': err.message});
  });
});

app.listen(PORT, HOST, function () {
  console.log('Example app listening on port 3000!');
});

OAuth2Controller.init();