import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  school_disciplines: { type: String, required: true },
  contact: { type: String, required: true },
  phone_number: { type: String, required: true },
  status: { type: String, default: 'on' }
});

export default mongoose.model('Teacher', teacherSchema);