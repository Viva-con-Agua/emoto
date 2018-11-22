"use strict";

const express = require('express');

const app = express();

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
  return res.status(501);
});

app.get('/questions', function(req, res){
  return res.status(501);
});

app.get('/answers', function(req, res){
  return res.status(501);
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