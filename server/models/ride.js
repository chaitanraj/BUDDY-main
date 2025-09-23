const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  location: { type: String, required: true },
  datetime: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Ride = mongoose.model('Ride', rideSchema);

module.exports = Ride;
