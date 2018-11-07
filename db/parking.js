var mongoose = require('mongoose');

var parkingSchema = new mongoose.Schema({
  name: {
    type: String
  },
  numberPlate: {
    type: String,
    required: true
  },
  parkingNumber: {
    type: Number,
    unique: true,
    required: true
  }
});

var Parking = mongoose.model("Parking", parkingSchema);

module.exports = {Parking}
