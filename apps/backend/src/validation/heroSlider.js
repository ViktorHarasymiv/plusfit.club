import Joi from 'joi';

export const createHeroSliderSchema = Joi.object({
  greeting: Joi.string().min(3).required().messages({
    'string.base': 'Greeting має бути текстом',
    'string.empty': 'Greeting не може бути порожнім',
    'string.min': 'Greeting має містити щонайменше 3 символи',
    'any.required': 'Greeting обов’язкове поле',
  }),

  title: Joi.object({
    base: Joi.string().required().messages({
      'any.required': 'Title.base обов’язкове поле',
    }),
    accent: Joi.string().required().messages({
      'any.required': 'Title.accent обов’язкове поле',
    }),
    baseFinish: Joi.string().required().messages({
      'any.required': 'Title.baseFinish обов’язкове поле',
    }),
  }),

  about: Joi.string().max(500).required().messages({
    'string.max': 'Опис не може перевищувати 500 символів',
    'any.required': 'Опис обов’язковий',
  }),

  action: Joi.array().items(Joi.string().required()).max(2).messages({
    'array.max': 'Можна вказати не більше двох дій',
  }),

  backgroundImage: Joi.string()
    .pattern(/^\/img\/.*\.(jpg|jpeg|png|webp)$/)
    .required()
    .messages({
      'string.pattern.base': 'Невірний формат шляху до зображення',
      'any.required': 'backgroundImage обов’язкове поле',
    }),
});
