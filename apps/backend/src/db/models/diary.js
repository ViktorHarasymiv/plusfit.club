import { model, Schema, Types } from 'mongoose';

const diarySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      match: /^\d{4}-\d{2}-\d{2}$/,
      default: () => new Date().toISOString().split('T')[0],
    },

    emotions: [
      {
        type: String,
        ref: 'Emotions',
        required: true,
      },
    ],

    userId: {
      type: Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },

  {
    timestamps: true,
    versionKey: false,
  },
);

export const DiaryCollection = model('diary', diarySchema);
