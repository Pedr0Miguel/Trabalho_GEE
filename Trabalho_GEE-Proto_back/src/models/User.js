import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  user: { type: String, required: true },
  pwd: { type: String, required: true },
  level: { type: String, required: true },
  status: { type: String, default: 'on' }
});

const User = mongoose.model('User', userSchema);

export default User;