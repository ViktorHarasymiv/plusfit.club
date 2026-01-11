import Joi from 'joi';

export const updateUserSchema = Joi.object({
  avatar: Joi.string().uri().optional(),
  wrapper: Joi.string().uri().optional(),
  email: Joi.string().email().max(64).optional(),
  name: Joi.string().min(1).max(32).optional(),
  sex: Joi.string().valid('Man', 'Woman').optional(),
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
      'Emaciation',
      'Maintain weight',
      'Slow weight gain',
      'Active weight gain',
      'Gaining lean muscle mass',
    )
    .optional(),
  section: Joi.string()
    .valid('Gym', 'Fitness', 'Massage', 'Yoga', 'Rehabilitation')
    .optional(),
  height: Joi.number().min(130).max(220).optional(),
  weight: Joi.number().min(35).max(220).optional(),
  activityLevel: Joi.string()
    .valid('Sitting', 'Weak', 'Average', 'Active', 'Strong activity')
    .optional(),
  interests: Joi.array().items(Joi.string()).min(1).max(3).optional(),
  BMR: Joi.number().optional(),
  BMI: Joi.number().optional(),
  activeProgram: Joi.string().optional(),
  activeNote: Joi.string().optional(),
  isVerified: Joi.boolean().optional(),
  verifyCode: Joi.string().length(6).optional(), // наприклад, 6-значний код
  verifyExpires: Joi.date().optional(),
});
