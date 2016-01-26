var restful = require('node-restful'),
  mongoose = restful.mongoose;

var Question = restful.model('question', new mongoose.Schema({
    description: {
      type: String,
      trim: true,
      required: true
    },
    title: {
      type: String,
      trim: true,
      required: true,
      minlength: 5,
      maxlength: 40
    },
    answer: {
      type: String,
      trim: true,
      required: true
    }
  }))
  .methods(['get', 'post', 'put', 'delete']);

module.exports = Question;
