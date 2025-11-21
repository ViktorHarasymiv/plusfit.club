import Joi from 'joi';

export const portfolioValidationSchema = Joi.object({
  section: Joi.string()
    .valid('Gym', 'Fitness', 'Rehabilitation', 'Yoga', 'Massage')
    .required(),
  alt: Joi.string().min(2).max(100).required(),
});
