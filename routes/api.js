var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Question = require('../models/question');

module.exports = function(app) {
  User.register(app, '/api/user');
  Question.register(app, '/api/question');

  return router;
};
