// src/db/models/user.js

import { model, Schema, Types } from 'mongoose';

const subscriptionHistorySchema = new Schema(
  {
    subscriptionId: {
      type: Types.ObjectId,
      ref: 'subscriptions',
      required: true,
    },
    clientId: { type: String, required: true },
    type: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    price: { type: String, required: true },
    method: { type: String, required: true },
    status: { type: String }, // наприклад: 'active', 'expired', 'claimed'
    addedAt: { type: Date, default: Date.now },
  },
  { _id: false },
);

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
    age: { type: Number, trim: true, required: true },
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

    history: [subscriptionHistorySchema],
  },
  { timestamps: true, versionKey: false },
);

usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UsersCollection = model('users', usersSchema);
