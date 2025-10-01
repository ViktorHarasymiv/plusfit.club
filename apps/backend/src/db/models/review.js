import { model, Schema } from 'mongoose';

const reviewSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 40,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 34,
      trim: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },

    section: {
      type: String,
      required: true,
      enum: [
        'Спортивний зал',
        'Масаж',
        'Йога',
        'Дитячі тренування',
        'Ендосфера',
        'Реабілітація',
      ],
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    message: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 500,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ReviewsCollection = model('review', reviewSchema);
