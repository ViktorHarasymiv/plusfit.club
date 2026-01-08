import Joi from 'joi';

export const postValidationSchema = Joi.object({
  title: Joi.string().trim().min(3).max(200).required(),

  content: Joi.array().items(Joi.string().trim().min(1)).min(1).required(),

  quote: Joi.object({
    text: Joi.string().trim().allow(''),
    author: Joi.string().trim().allow('').default(''),
  }).optional(),

  author: Joi.string().trim().allow(''),

  images: Joi.array()
    .items(Joi.string().uri({ scheme: ['http', 'https'] }))
    .optional(),

  tags: Joi.array().items(Joi.string().trim().min(1)).default([]),

  views: Joi.number().integer().min(0).default(0),

  likedBy: Joi.array(),
  likes: Joi.number().integer().min(0).default(0),

  isPrivate: Joi.boolean().default(false),

  createdAt: Joi.date().default(() => new Date(), 'current date'),
});
