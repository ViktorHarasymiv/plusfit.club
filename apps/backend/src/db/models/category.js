import { Schema, model } from 'mongoose';

const categorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { versionKey: false },
);

export const CategoryCollection = model('Categories', categorySchema);
