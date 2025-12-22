import Joi from 'joi';

// --------------------
// Exercise validation
// --------------------
export const exerciseSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
});

// --------------------
// Workout Day validation
// --------------------
export const workoutDaySchema = Joi.object({
  title: Joi.string().trim().min(3).max(100),
  exercises: Joi.array().items(exerciseSchema).default([]),
});

// --------------------
// Training Program validation
// --------------------
export const trainingProgramSchema = Joi.object({
  userId: objectId(),
  isPublic: Joi.boolean(),
  name: Joi.string().trim().min(3).max(100),
  description: Joi.string().allow('').max(500).default(''),
  days: Joi.array().items(workoutDaySchema).default([]),
});
