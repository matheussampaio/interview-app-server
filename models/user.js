var restful = require('node-restful'),
  mongoose = restful.mongoose;

var User = restful.model('user', new mongoose.Schema({
    username: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
      minlength: 5,
      maxlength: 40,
      unique: true
    },
    firstname: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
      minlength: 5,
      maxlength: 40
    },
    lastname: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
      minlength: 5,
      maxlength: 40
    },
    password: {
      type: String,
      trim: true,
      required: true,
      minlength: 5,
      maxlength: 40
    },
    email: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
      minlength: 5,
      maxlength: 40,
      unique: true
    }
  }))
  .methods(['get', 'post', 'put', 'delete']);

module.exports = User;
