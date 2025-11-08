import Joi from 'joi';

export const registerAdminSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  sex: Joi.string().valid('Чоловік', 'Жінка').optional(),
  role: Joi.string().required(),
  password: Joi.string().required(),
  acceptedTerms: Joi.boolean().required(),
});

export const loginAdminSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
