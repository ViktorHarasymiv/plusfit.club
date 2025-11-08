import { model, Schema } from 'mongoose';

import { ROLES } from '../../constants/index.js';

const adminsSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    sex: { type: String, enum: ['Чоловік', 'Жінка'] },
    role: {
      type: String,
      enum: [ROLES.ADMIN, ROLES.TRAINER],
      default: ROLES.TRAINER,
    },
    password: { type: String, trim: true, required: true },
  },
  { timestamps: true, versionKey: false },
);

adminsSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const AdminCollection = model('admins', adminsSchema, 'admins');
