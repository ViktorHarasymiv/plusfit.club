import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

export const createDiarySchema = Joi.object({
  title: Joi.string().min(1).max(64).required(),
  description: Joi.string().min(1).max(1000).required(),
  emotions: Joi.array().items(Joi.string()).min(1).max(12).required(),
});

export const updateDiarySchema = Joi.object({
  title: Joi.string().min(1).max(64).optional(),
  description: Joi.string().min(1).max(1000).optional(),

  emotions: Joi.array().items(Joi.string()).min(1).max(12).optional(),
});
