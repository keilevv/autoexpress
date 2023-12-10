// clientModel.js
var mongoose = require("mongoose");
// Setup schema
var clientSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  telephoneNumber: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
  },
  countryId: {
    type: String,
    required: true,
  },

  cars: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
    },
  ],
});

// Export Car model
var Client = (module.exports = mongoose.model("client", clientSchema));
module.exports.get = function (callback, limit) {
  Client.find(callback).limit(limit);
};