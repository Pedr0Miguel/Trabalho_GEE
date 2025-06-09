const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  special_needs: String,
  parents: String,
  phone_number: String,
  status: { type: String, default: 'on' }
});

module.exports = mongoose.model('Student', studentSchema);