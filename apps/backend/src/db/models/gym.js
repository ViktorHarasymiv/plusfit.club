import { model, Schema } from 'mongoose';

const GymSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: [
    {
      time: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  features: [
    {
      gym: {
        type: Boolean,
        default: false,
      },
      isActive: {
        type: Boolean,
        default: true,
      },
      consultation: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

export const GymCollection = model('gyms', GymSchema);
