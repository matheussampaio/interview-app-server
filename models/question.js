var restful = require('node-restful');
var User = require('./user');

var mongoose = restful.mongoose;

var Question = restful.model('question', new mongoose.Schema({
    question: {
      type: String,
      trim: true,
      required: true
    },
    answer: {
      type: String,
      trim: true,
      required: true
    },
    quiz: {
      type: Boolean,
      default: false
    },
    wrong_choices: [{
      type: String
    }],
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }],
    dislikes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }],
    bookmark: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }],
    keywords: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'keyword'
    }]
  }))
  .methods(['get', 'post', 'put', 'delete']);

Question.route('bookmark.post', {
    detail: true,
    handler: function(req, res, next) {
      var updateQuestion = {};
      var updateUser = {};

      // add
      if (req.body.bookmark) {
        updateQuestion = {
          $addToSet: {
            bookmark: req.body.user
          }
        };

        updateUser = {
          $addToSet: {
            bookmark: req.params.id
          }
        };
      } else {
        updateQuestion = {
          $pull: {
            bookmark: req.body.user
          }
        };

        updateUser = {
          $pull: {
            bookmark: req.params.id
          }
        };
      }

      var options = {
        new: true
      };

      Question.findByIdAndUpdate(req.params.id, updateQuestion, options, function (err, question) {
        if (!err) {
          User.findByIdAndUpdate(req.body.user, updateUser, options, function (err, user) {
            if (!err) {
              res.send(question);
            } else {
              res.send(err);
            }
          });
        } else {
          res.send(err);
        }
      });
    }
});

Question.route('like.post', {
    detail: true,
    handler: function (req, res, next) {
      var updateQuestion = {};
      var updateUser = {};

      // add like and remove dislikes
      if (req.body.like) {
        updateQuestion = {
          $addToSet: {
            likes: req.body.user
          },
          $pull: {
            dislikes: req.body.user
          }
        };

        updateUser = {
          $addToSet: {
            likes: req.params.id
          },
          $pull: {
            dislikes: req.params.id
          }
        };

      // add dislikes and remove from likes
      } else if (req.body.dislike) {
        updateQuestion = {
          $pull: {
            likes: req.body.user
          },
          $addToSet: {
            dislikes: req.body.user
          }
        };

        updateUser = {
          $pull: {
            likes: req.params.id
          },
          $addToSet: {
            dislikes: req.params.id
          }
        };

      // remove both likes and dislikes
      } else {
        updateQuestion = {
          $pull: {
            likes: req.body.user,
            dislikes: req.body.user
          }
        };

        updateUser = {
          $pull: {
            likes: req.params.id,
            dislikes: req.params.id
          }
        };
      }

      var options = {
        new: true
      };

      Question.findByIdAndUpdate(req.params.id, updateQuestion, options, function (err, question) {
        if (!err) {
          User.findByIdAndUpdate(req.body.user, updateUser, options, function (err, user) {
            if (!err) {
              res.send(question);
            } else {
              res.send(err);
            }
          });
        } else {
          res.send(err);
        }
      });
    }
});

module.exports = Question;
