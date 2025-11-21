import { model, Schema } from 'mongoose';

const PortfolioSchema = new Schema(
  {
    section: {
      type: String,
      enum: ['Gym', 'Fitness', 'Rehabilitation', 'Yoga', 'Massage'],
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

export const PortfolioCollection = model('photos', PortfolioSchema);
