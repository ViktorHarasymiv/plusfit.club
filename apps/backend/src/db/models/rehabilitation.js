import { model, Schema } from 'mongoose';

const RehabilitationSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: '',
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  duration_min: {
    type: Number,
    required: true,
    min: 1,
  },
});

export const RehabilitationCollection = model(
  'rehabilitations',
  RehabilitationSchema,
);
