const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
});

const deviceSchema = new mongoose.Schema({
  deviceId: { type: String, required: true},
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  location: [locationSchema]
});

module.exports = mongoose.model('Device', deviceSchema);