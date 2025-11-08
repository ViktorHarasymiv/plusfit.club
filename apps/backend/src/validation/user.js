import Joi from 'joi';

export const updateUserSchema = Joi.object({
  avatar: Joi.string().uri().optional(),
  wrapper: Joi.string().uri().optional(),
  email: Joi.string().email().max(64).optional(),
  name: Joi.string().min(1).max(32).optional(),
  sex: Joi.string().valid('Чоловік', 'Жінка').optional(),
  phone: Joi.string()
    .pattern(/^\+380\d{9}$/)
    .messages({
      'string.pattern.base': 'Номер телефону має бути у форматі +380XXXXXXXXX',
      'string.empty': 'Номер телефону обовʼязковий',
    })
    .optional(),
  birthday: Joi.date()
    .greater(new Date(new Date().setFullYear(new Date().getFullYear() - 120)))
    .optional(),

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
  height: Joi.number().min(130).max(220).optional(),
  weight: Joi.number().min(35).max(220).optional(),
  activityLevel: Joi.string()
    .valid('Сидячий', 'Слабо', 'Середній', 'Активний', 'Сильна активність')
    .optional(),
  BMR: Joi.number().optional(),
  BMI: Joi.number().optional(),
});
