const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  school_disciplines: { type: String, required: true },
  contact: { type: String, required: true },
  phone_number: { type: String, required: true },
  status: { type: String, default: 'on' }
});

module.exports = mongoose.model('Teacher', teacherSchema);