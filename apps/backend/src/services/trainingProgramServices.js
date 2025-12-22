// services/programs.service.js

import { TrainingProgram } from '../db/models/trainingPrograms.js';
import mongoose from 'mongoose';

export const getAllProgramsService = async (userId) => {
  return await TrainingProgram.find({
    $or: [{ isPublic: true }, { userId: new mongoose.Types.ObjectId(userId) }],
  });
};

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

export const getProgramByIdService = async (id) => {
  const program = await TrainingProgram.findById(id);

  if (!program) {
    return null; // контролер сам вирішить, що робити
  }

  return program;
};
