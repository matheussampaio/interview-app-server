var restful = require('node-restful'),
  mongoose = restful.mongoose;

var Question = restful.model('question', new mongoose.Schema({
    description: {
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
