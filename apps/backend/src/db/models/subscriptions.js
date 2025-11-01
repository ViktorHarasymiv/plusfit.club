import { model, Schema } from 'mongoose';

const subscriptionsSchema = new Schema(
  {
    clientId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },

    type: { type: String, required: true },
    timeBorder: { type: Number },
    status: { type: String },

    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },

    price: { type: Number, required: true },
    method: { type: String, required: true },
    isVerify: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false },
);

// subscriptionsSchema.index({ phone: 1 }, { unique: true });
subscriptionsSchema.index({ clientId: 1 }, { unique: true });
// subscriptionsSchema.index({ email: 1 }, { unique: true });

export const SubscriptionsCollection = model(
  'subscriptions',
  subscriptionsSchema,
);
