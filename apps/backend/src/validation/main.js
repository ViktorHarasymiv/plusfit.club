import Joi from 'joi';

export const mainValidationSchema = Joi.object({
  email: { type: String },
  phone: { type: String },
  address: { type: String },
  media: {
    facebook: { type: String },
    instagram: { type: String },
  },
  member: { type: Number },
  equipment: { type: Number },
  trainer: { type: Number },
  awards: { type: Number },
});
