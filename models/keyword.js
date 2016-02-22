var restful = require('node-restful');
var mongoose = restful.mongoose;

var Keyword = restful.model('keyword', new mongoose.Schema({
    name: {
      type: String,
      trim: true,
      required: true
    }
  }))
  .methods(['get', 'post', 'put', 'delete']);

module.exports = Keyword;
