import Joi from 'joi';

export const postValidationSchema = Joi.object({
  userId: Joi.string().required(),

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
  likes: Joi.number().integer().min(0).default(0),
  commentsCount: Joi.number().integer().min(0).default(0),

  isFeatured: Joi.boolean().default(true),
  isPrivate: Joi.boolean().default(false),
});
