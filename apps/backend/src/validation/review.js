import Joi from 'joi';

export const getReviewSchema = Joi.object({
  name: Joi.string(),

  email: Joi.string().email({ tlds: { allow: false } }),

  section: Joi.string(),

  rating: Joi.number(),

  message: Joi.string(),
});

export const createReviewSchema = Joi.object({
  name: Joi.string().min(2).max(40).required().messages({
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 2 characters',
    'string.max': 'Name must be at most 40 characters',
  }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .min(6)
    .max(34)
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Invalid email format',
      'string.min': 'Email must be at least 6 characters',
      'string.max': 'Email must be at most 34 characters',
    }),

  section: Joi.string().required().messages({
    'string.empty': 'Section is required',
  }),

  rating: Joi.number().min(1).max(5).required().messages({
    'number.base': 'Rating must be a number',
    'number.min': 'Rating must be at least 1',
    'number.max': 'Rating must be at most 5',
    'any.required': 'Rating is required',
  }),

  message: Joi.string().min(10).max(340).required().messages({
    'string.empty': 'Message is required',
    'string.min': 'Message must be at least 10 characters',
    'string.max': 'Message must be at most 180 characters',
  }),
});
