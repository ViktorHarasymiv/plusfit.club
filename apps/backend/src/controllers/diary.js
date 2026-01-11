import createHttpError from 'http-errors';
import {
  getUserDiaries,
  createDiaryService,
  updateDiaryService,
  deleteDiaryService,
  getDiaryByIdService,
} from '../services/diary.js';

import { SessionsCollection } from '../db/models/session.js';

export const getUserDiaryController = async (req, res) => {
  try {
    const sessionId = req.cookies?.sessionId;

    const session = await SessionsCollection.findById(sessionId);

    const tasks = await getUserDiaries({ userId: session.userId });

    res.status(200).json({
      status: 200,
      message: 'Successfully found tasks list!',
      result: tasks,
    });
  } catch (error) {
    console.error('getTaskController failed:', {
      message: error?.message,
      stack: error?.stack,
    });

    res.status(500).json({
      status: 500,
      message: 'Failed to fetch tasks',
    });
  }
};

// BY ID

export const getDiaryById = async (req, res) => {
  try {
    const { id } = req.params;

    const diary = await getDiaryByIdService(id);

    if (!diary) {
      return res.status(404).json({ message: 'Program not found' });
    }

    res.json(diary);
  } catch (error) {
    console.error('Error fetching program:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createDiaryController = async (req, res, next) => {
  try {
    const sessionId = req.cookies?.sessionId;

    if (!sessionId) {
      return res
        .status(401)
        .json({ message: 'Session ID not found in cookies' });
    }

    const session = await SessionsCollection.findById(sessionId);

    if (!session) {
      return res.status(401).json({ message: 'Invalid session' });
    }

    const diaryData = {
      userId: session.userId,
      ...req.body,
    };

    const newDiary = await createDiaryService(diaryData);

    res.status(201).json({
      status: 201,
      message: 'Successfully create a diary entry!',
      data: newDiary,
    });
  } catch (err) {
    next(err);
  }
};

export const updateDiaryController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sessionId = req.cookies?.sessionId;

    const session = await SessionsCollection.findById(sessionId);

    const updatedDiary = await updateDiaryService(id, session.userId, req.body);
    const updateData = req.body;

    if (!updateData || Object.keys(updateData).length === 0) {
      return next(createHttpError(400, 'Missing fields for update'));
    }

    if (!updatedDiary) {
      return res.status(404).json({
        status: 404,
        message: 'Diary not found',
        data: null,
      });
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully updated diary!',
      data: updatedDiary,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteDiaryController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sessionId = req.cookies?.sessionId;

    const session = await SessionsCollection.findById(sessionId);

    if (!session) {
      return res.status(401).json({
        status: 401,
        message: 'Unauthorized',
        data: null,
      });
    }

    const userId = session.userId;

    const deletedDiary = await deleteDiaryService(id, userId);

    if (!deletedDiary) {
      return res.status(404).json({
        status: 404,
        message: 'Diary not found',
        data: null,
      });
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully deleted diary entry!',
      data: deletedDiary,
    });
  } catch (err) {
    next(err);
  }
};
