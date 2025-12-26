// services/programs.service.js
import mongoose from 'mongoose';

import { TrainingProgram } from '../db/models/trainingPrograms.js';

// ALL

export const getAllProgramsService = async (userId) => {
  return await TrainingProgram.find({
    $or: [{ isPublic: true }, { userId: new mongoose.Types.ObjectId(userId) }],
  });
};

//  LIST

export const getListProgramsService = async (userId) => {
  return await TrainingProgram.find(
    {
      $or: [
        { isPublic: true },
        { userId: new mongoose.Types.ObjectId(userId) },
      ],
    },
    { _id: 1, name: 1 },
  );
};

// BY ID

export const getProgramByIdService = async (id) => {
  const program = await TrainingProgram.findById(id);

  if (!program) {
    return null; // контролер сам вирішить, що робити
  }

  return program;
};

// PATH

export const updateProgramService = async (programId, payload) => {
  const { name, description, days } = payload;

  const program = await TrainingProgram.findById(programId);
  if (!program) {
    throw new Error('Program not found');
  }

  // Оновлюємо прості поля
  program.name = name;
  program.description = description;

  // Оновлюємо дні
  program.days = days.map((day) => ({
    _id:
      day._id && mongoose.isValidObjectId(day._id)
        ? day._id
        : new mongoose.Types.ObjectId(),

    title: day.title,

    exercises: day.exercises.map((ex) => ex),
  }));

  await program.save();

  return program;
};
