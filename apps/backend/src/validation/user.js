import Joi from 'joi';

export const updateUserSchema = Joi.object({
  avatar: Joi.string().uri().optional(),
  email: Joi.string().email().max(64).optional(),
  name: Joi.string().min(1).max(32).optional(),
  goal: Joi.string()
    .valid(
      'Схуднення',
      'Утримати вагу',
      'Повільний набір маси',
      'Активний набір маси',
      'Набір сухої мязової маси',
    )
    .optional(),
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
