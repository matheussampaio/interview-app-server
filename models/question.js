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
    }
  }))
  .methods(['get', 'post', 'put', 'delete']);

module.exports = Question;
