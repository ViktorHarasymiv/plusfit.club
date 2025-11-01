// src/db/models/user.js

import { model, Schema } from 'mongoose';

const usersSchema = new Schema(
  {
    avatar: {
      type: String,
      trim: true,
    },
    wrapper: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      maxlength: [64, 'Email cannot exceed 64 characters'],
      match: [
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        'Email is invalid',
      ],
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      maxlength: [32, 'Name cannot exceed 32 characters'],
      trim: true,
    },
    age: { type: Number, trim: true },
    goal: {
      type: String,
      enum: [
        'Схуднення',
        'Утримати вагу',
        'Повільний набір маси',
        'Активний набір маси',
        'Набір сухої мязової маси',
      ],
      default: null,
    },
    section: {
      type: String,
      enum: [
        'Спортивний зал',
        'Реабілітація та масаж',
        'Йога',
        'Дитячі танці',
        'Ендосфера',
      ],
      default: null,
    },
    activityLevel: {
      type: String,
      enum: ['Сидячий', 'Слабо', 'Середній', 'Активний', 'Сильна активність'],
      default: null,
    },
    password: { type: String, trim: true, required: true },
    acceptedTerms: { type: Boolean, trim: true, require: true },
  },
  { timestamps: true, versionKey: false },
);

usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UsersCollection = model('users', usersSchema);
