import { Schema, model, Types } from 'mongoose';

// const ExerciseSchema = new Schema({
//   _id: { type: Types.ObjectId },
//   name: { type: String, required: true, trim: true },
// });

const WorkoutDaySchema = new Schema(
  {
    _id: { type: Types.ObjectId },
    title: { type: String, required: true, trim: true },
    exercises: { type: [], default: [] },
  },
  { _id: false },
);

const TrainingProgramSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    isPublic: { type: Boolean, default: false, required: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },

    days: { type: [WorkoutDaySchema], default: [] },
  },
  { timestamps: true, versionKey: false },
);

export const TrainingProgram = model('trainingprograms', TrainingProgramSchema);
