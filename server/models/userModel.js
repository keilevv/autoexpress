// userModel.js
var mongoose = require("mongoose");
// Setup schema
var userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
});

// Export Info model
var User = (module.exports = mongoose.model("user", userSchema));
module.exports.get = function (callback, limit) {
  User.find(callback).limit(limit);
};