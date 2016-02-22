var restful = require('node-restful');
var mongoose = restful.mongoose;

var Feedback = restful.model('feedback', new mongoose.Schema({
    description: {
      type: String,
      trim: true,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user'
    },
    done: {
      type: Boolean,
      default: false
    },
    read: {
      type: Boolean,
      default: false
    }
  }))
  .methods(['get', 'post', 'put', 'delete']);

module.exports = Feedback;
