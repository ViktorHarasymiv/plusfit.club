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
    sex: { type: String, enum: ['Man', 'Woman'] },
    birthday: { type: Date },
    phone: { type: String },
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
      enum: ['Gym', 'Fitness', 'Massage', 'Rehabilitation', 'Yoga'],
      default: null,
    },
    height: { type: Number },
    weight: { type: Number },
    activityLevel: {
      type: String,
      enum: ['Сидячий', 'Слабо', 'Середній', 'Активний', 'Сильна активність'],
      default: null,
    },
    BMR: {
      type: Number,
    },
    BMI: {
      type: Number,
    },
    password: { type: String, trim: true, required: true },
    acceptedTerms: { type: Boolean, trim: true, required: true },
    isVerified: { type: Boolean, default: false }, // чи підтверджений акаунт
    verifyCode: { type: String }, // код підтвердження
    verifyExpires: { type: Date }, // дата закінчення дії коду
  },
  { timestamps: true, versionKey: false },
);

usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UsersCollection = model('users', usersSchema);
