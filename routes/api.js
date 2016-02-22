var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Question = require('../models/question');
var Keyword = require('../models/keyword');
var Feedback = require('../models/feedback');

module.exports = function(app) {
  User.register(app, '/api/user');
  Question.register(app, '/api/question');
  Keyword.register(app, '/api/keyword');
  Feedback.register(app, '/api/feedback');

  return router;
};
