const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  specialty: { type: String, required: true },
  comments: { type: String, required: true },
  date: { type: String, required: true },
  student: { type: String, required: true },
  professional: { type: String, required: true }
});

module.exports = mongoose.model('Appointment', appointmentSchema);