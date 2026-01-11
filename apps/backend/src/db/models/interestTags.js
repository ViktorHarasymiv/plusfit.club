import { Schema, model } from 'mongoose';

const interestSchema = new Schema(
  {
    tag: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { versionKey: false },
);

export const InterestCollection = model('interestTags', interestSchema);
