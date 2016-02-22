var restful = require('node-restful');
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
    wrong_choices: [
      {
        type: String
      }
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      }
    ],
    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      }
    ],
    keywords: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'keyword'
      }
    ]
  }))
  .methods(['get', 'post', 'put', 'delete']);

module.exports = Question;
