"use strict";


const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();

const bodyparser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const validateUUID = require('uuid-validate');
const morgan = require('morgan');
const path = require('path');
const rfs = require('rotating-file-stream');
var fs = require('fs');

const QuestionsController = require('./src/controller/QuestionController');
const AnswerController = require('./src/controller/AnswerController');
const MoodInquiryController = require('./src/controller/MoodInquiryController');
const MoodPictureController = require('./src/controller/MoodPictureController');
const OAuth2Controller = require('./src/controller/OAuth2Controller');
const UserController = require('./src/controller/UserController');
const UserIdHelper = require('./src/helper/UserIdHelper');
const MoodPictureHelper = require('./src/helper/MoodPictureHelper');
const CRMHelper = require('./src/helper/CRMHelper');
const AnalyticsController = require('./src/controller/AnalyticsController');

const USER_ID_HEADER_FIELDNAME = 'X-EMOTO-USER'.toLowerCase();
const CREW_ID_HEADER_FIELDNAME = 'X-EMOTO-CREW'.toLowerCase();

const PORT = 8080;
const HOST = '0.0.0.0';

const logDirectory = path.join(__dirname, 'log');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// create a rotating write stream
var accessLogStream = rfs('access.log', {
  interval: '1d', // rotate daily
  path: logDirectory
})
 
// setup the logger
morgan.token('user', function (req, res) { return req.headers[USER_ID_HEADER_FIELDNAME]; });
morgan.token('crew', function (req, res) { return req.headers[CREW_ID_HEADER_FIELDNAME]; });
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :user - :crew', {stream: accessLogStream}));

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: false
}));

app.use(cookieParser());



app.all('/emotobackend*', function(req, res, next){
  //http://localhost/emotobackend/subpath
  req.url = req.url.replace(/^\/emotobackend\//, '/');
  //http://localhost/emotobackend
  req.url = req.url.replace(/^\/emotobackend/, '/');

  return next();
});

///////////////////
// public routes //
///////////////////


app.get('/', function (req, res) {
  return res.send('emoto is running');
});

app.post('/user/access', function(req,res){
  const id = req.body.userId;
  const email = req.body.email;
  if(email === ''){
    return res.status(500).send({'error': 'Empty string is no valid value for email'});
  }else if(!validateUUID(id)){
    return res.status(500).send({'error': 'invalid data type for user id'});
  }
  
  const crewId = req.body.crewId || null;
  if(id === undefined || email === undefined){
    return res.status(500).send({'error': 'parameter userId and email required'});
  }

  return UserController.findByDropsId(id)
  .then(function(u){
    if(u !== null){
      return res.send({
        access: true,
        active: u.active
      });
    }else{
      return CRMHelper.validateAccess(email)
      .then(function(a){
        if(a){
          return UserController.create(id, crewId)
          .then(function(){
            return res.send({
              access: true,
              active: false
            });
          });
        }else{
          return res.send({
            access: false,
            active: false
          });
        }
      });
    }
  })
  .catch(function(err){
    console.log(err.toString());
    return res.status(500).send({'error': 'internal server error'});
  });
});

/////////////////////
// analytic routes //
/////////////////////

app.get('/analytics/participants', function(req, res){
  return AnalyticsController.getParticipants()
  .then(function(participants){
    return res.send(participants);
  });
});

app.get('/analytics/crews', function(req, res){
  return AnalyticsController.getCrews()
  .then(function(crews){
    return res.send(crews);
  });
});

app.get('/analytics/moods', function(req, res){
  return AnalyticsController.getMoods()
  .then(function(moods){
    return res.send(moods);
  });
});

app.get('/analytics/mood/:id', function(req,res){
  return AnalyticsController.getMood(req.params.id)
  .then(function(mood){
    return res.send(mood);
  });
});

/////////////////////////////////////
// routes which need a internal id //
/////////////////////////////////////

app.use(function(req,res,next){
  if(req.headers[USER_ID_HEADER_FIELDNAME]){
    const id = req.headers[USER_ID_HEADER_FIELDNAME];
    const crew = req.headers[CREW_ID_HEADER_FIELDNAME];
    if(!validateUUID(id)){
      return res.status(500).send({'error': 'invalid data type for user id'});
    }
    return UserIdHelper.translateId(id, crew)
    .then(function(u){
      req.user = u.id;
      req.active = u.active;
      next();
      return Promise.resolve();
    })
    .catch(function(err){
      return res.status(401).send({'error': err.toString()});
    });
  }else{
    return next();
  }
});

app.post('/settings', function(req, res){
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
    return UserController.setSettings(req.user, settings);
  })
  .then(function(user){
    return res.send(user);
  })
  .catch(function(err){
    return res.status(500).send({'error': err.message});
  });
});

///////////////////////////////////////////////
// protected internal routes for active user //
///////////////////////////////////////////////

app.use(function(req, res ,next){
  if(req.active){
    return next();
  }else{
    return res.status(401).send({'error': 'user not active'});
  }
});

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
  let userId = req.user;
  return MoodPictureHelper.handleCustomQuestions(userId, req.body.mood)
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



app.get('/user', function(req, res){
  return UserController.find(req.user)
  .then(function(u){
    return res.send(u);
  });
});

app.listen(PORT, HOST, function () {
  console.log('Example app listening on port 8080!');
});

OAuth2Controller.init();
