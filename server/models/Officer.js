const mongoose = require('mongoose');

const officerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  bookedSlots: [{
    date: String,
    time: String,
    userId: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Officer', officerSchema); 