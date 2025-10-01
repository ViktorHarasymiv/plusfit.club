import { model, Schema } from 'mongoose';

const subscriptionsSchema = new Schema(
  {
    clientId: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    birthday: { type: String, require: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },

    type: { type: String, required: true },
    status: { type: String, required: true },

    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },

    price: { type: String, required: true },
    currency: { type: String, default: 'UAH' },
    method: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

subscriptionsSchema.index({ phone: 1 }, { unique: true });
subscriptionsSchema.index({ clientId: 1 }, { unique: true });
subscriptionsSchema.index({ email: 1 }, { unique: true });

export const SubscriptionsCollection = model(
  'subscriptions',
  subscriptionsSchema,
);
