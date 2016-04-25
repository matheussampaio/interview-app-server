var restful = require('node-restful');
var mongoose = restful.mongoose;

var User = restful.model('user', new mongoose.Schema({
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
    },
    points: {
      type: Number,
      default: 0
    },
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'question'
    }],
    dislikes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'question'
    }],
    bookmark: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'question'
    }],
  }))
  .methods(['get', 'post', 'put', 'delete']);

User.route('points.post', {
    detail: true,
    handler: function (req, res, next) {
      var updateUser = {
        $inc: {
          points: req.body.points
        }
      };

      var options = {
        new: true
      };

      User.findByIdAndUpdate(req.params.id, updateUser, options, function (err, user) {
        if (!err) {
          res.status(200).send(user);
        } else {
          res.status(400).send(err);
        }
      });
    }
});

module.exports = User;
