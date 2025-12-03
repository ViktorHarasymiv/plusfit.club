import Joi from 'joi';

export const postValidationCommentSchema = Joi.object({
  postId: Joi.string().hex().length(24).required(), // ObjectId як рядок
  userId: Joi.string().hex().length(24).required(), // ObjectId як рядок
  text: Joi.string().min(1).max(500).required(), // сам коментар
  userSnapshot: Joi.object({
    name: Joi.string().required(),
    avatar: Joi.string().uri().optional(),
  }).required(),
  createdAt: Joi.date().default(() => new Date(), 'current date'),
});
