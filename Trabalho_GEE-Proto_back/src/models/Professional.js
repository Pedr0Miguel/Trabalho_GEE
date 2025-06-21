import mongoose from 'mongoose';

const professionalSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  contact: { type: String, required: true },
  phone_number: { type: String, required: true },
  status: { type: String, default: 'on' }
});

export default mongoose.model('Professional', professionalSchema);