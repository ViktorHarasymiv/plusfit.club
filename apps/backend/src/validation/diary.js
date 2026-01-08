import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

export const createDiarySchema = Joi.object({
    title: Joi.string().min(1).max(64).required(),
    description: Joi.string().min(1).max(1000).required(),
    date: Joi.string()
          .pattern(/^\d{4}-\d{2}-\d{2}$/)
          .default(() => new Date().toISOString().split("T")[0])
          .optional(),
    emotions: Joi.array().items(
       Joi.string().custom((value, helper) => {
        if(value && !isValidObjectId(value)) {
            return helper.message('Invalid emotion ID!');
        };
        return value;
    }),
    ).min(1).max(12).required(),
});


export const updateDiarySchema = Joi.object({
    title: Joi.string().min(1).max(64).optional(),
    description: Joi.string().min(1).max(1000).optional(),
    date: Joi.string()
          .pattern(/^\d{4}-\d{2}-\d{2}$/)
          .default(() => new Date().toISOString().split("T")[0])
          .optional(),
    emotions: Joi.array().items(
       Joi.string().custom((value, helper) => {
        if(value && !isValidObjectId(value)) {
            return helper.message('Invalid emotion ID!');
        };
        return value;
    }),
    ).min(1).max(12).optional(),
});
