import { model, Schema } from 'mongoose';

const messageSchema = new Schema(
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
        'Загальне повідомлення',
        'Спортивний зал',
        'Реабілітація та масаж',
        'Йога',
        'Дитячі танці',
        'Ендосфера',
      ],
    },

    message: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 500,
      trim: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const MessagesCollection = model('message', messageSchema);
