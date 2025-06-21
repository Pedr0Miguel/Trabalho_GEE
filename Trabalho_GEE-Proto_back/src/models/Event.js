import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  comments: { type: String, required: true },
  date: { type: String, required: true }
});

export default mongoose.model('Event', eventSchema);