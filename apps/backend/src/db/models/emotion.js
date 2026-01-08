import { Schema, model } from 'mongoose';

const emotionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { versionKey: false },
);

export const EmotionCollection = model('Emotions', emotionSchema);
