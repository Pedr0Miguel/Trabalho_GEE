import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  age: { type: String, required: true },
  parents: { type: String, required: true },
  phone_number: { type: String, required: true },
  special_needs: { type: String, required: true },
  status: { type: String, default: 'on' }
});

export default mongoose.model('Student', studentSchema);