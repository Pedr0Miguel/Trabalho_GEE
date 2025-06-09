const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  user: { type: String, required: true },
  pwd: { type: String, required: true },
  level: { type: String, required: true },
  status: { type: String, default: 'on' }
});

module.exports = mongoose.model('User', userSchema);