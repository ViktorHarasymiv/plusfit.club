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
    'string.empty': "Ім'я обов'язкове",
    'string.min': "Ім'я мінімум 2 символи",
    'string.max': "Ім'я максимум 40 символів",
  }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .min(6)
    .max(34)
    .required()
    .messages({
      'string.empty': "Емейл обов'язковий",
      'string.email': 'Невірний формат емейлу',
      'string.min': 'Емейл мінімум 6 букв',
      'string.max': 'Емейл максимум 34 букви',
    }),

  section: Joi.string().required().messages({
    'string.empty': "Секція обов'язкова",
  }),

  rating: Joi.number().min(1).max(5).required().messages({
    'number.base': 'Оцінка має бути числом',
    'number.min': 'Оцінка мінімум 1',
    'number.max': 'Оцінка максимум 5',
    'any.required': "Оцінка обов'язкова",
  }),

  message: Joi.string().min(10).max(500).required().messages({
    'string.empty': "Повідомлення обов'язкове",
    'string.min': 'Повідомлення мінімум 10 символів',
    'string.max': 'Повідомлення максимум 500 символів',
  }),
});
