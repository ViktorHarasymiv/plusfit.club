import { model, Schema } from 'mongoose';

const ServiceSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: null,
  },
  price: {
    type: Number,
    required: true,
  },
  duration_min: {
    type: Number,
    required: true,
  },
});

const MassageSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true,
    },
    services: {
      type: [ServiceSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const MassageCollection = model('Massage', MassageSchema);
