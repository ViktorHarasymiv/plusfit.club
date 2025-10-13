import Joi from 'joi';

export const portfolioValidationSchema = Joi.object({
  section: Joi.string()
    .valid(
      'Тренажерний зал',
      'Масаж',
      'Реабілітація',
      'Йога',
      'Дитячі танці',
      'Ендосфера',
    )
    .required(),
  alt: Joi.string().min(2).max(100).required(),
});
