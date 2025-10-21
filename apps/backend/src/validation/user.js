import Joi from 'joi';

export const updateUserSchema = Joi.object({
  name: Joi.string().min(1).max(32).optional(),
  email: Joi.string().email().max(64).optional(),
  section: Joi.string()
    .valid(
      'Спортивний зал',
      'Реабілітація та масаж',
      'Йога',
      'Дитячі танці',
      'Ендосфера',
    )
    .optional(),
  activityLevel: Joi.string()
    .valid('Сидячий', 'Слабо', 'Середній', 'Активний', 'Сильна активність')
    .optional(),
});
