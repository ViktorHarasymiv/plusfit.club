import { model, Schema } from 'mongoose';

const mainSetupSchema = new Schema({
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  media: {
    facebook: { type: String, required: false },
    instagram: { type: String, required: false },
  },
  member: { type: Number, required: true },
  equipment: { type: Number, required: true },
  trainer: { type: Number, required: true },
  awards: { type: Number, required: true },
});

export const MainCollection = model('mains', mainSetupSchema);
