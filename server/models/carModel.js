// carModel.js
var mongoose = require("mongoose");
// Setup schema
var carSchema = mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Date,
    required: true,
  },
  plate: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  doors: {
    type: Number,
    default: 4,
  },
  clients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },
  ],
});

// Export Car model
var Car = (module.exports = mongoose.model("car", carSchema));
module.exports.get = function (callback, limit) {
  Car.find(callback).limit(limit);
};