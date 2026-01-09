import { DiaryCollection } from '../db/models/diary.js';
import { SORT_ORDER } from '../constants/index.js';

export const getUserDiaries = async ({
  userId,
  sortOrder = SORT_ORDER.DESC,
  sortBy = 'createdAt',
}) => {
  const queryConditions = { userId };

  const contactsQuery = DiaryCollection.find(queryConditions).sort({
    [sortBy]: sortOrder,
  });

  const [totalCount, tasks] = await Promise.all([
    DiaryCollection.find(queryConditions).clone().countDocuments(),
    contactsQuery.exec(),
  ]);

  return {
    data: tasks,
    total: totalCount,
  };
};

// BY ID

export const getDiaryByIdService = async (id) => {
  const diary = await DiaryCollection.findById(id);

  if (!diary) {
    return null; // контролер сам вирішить, що робити
  }

  return diary;
};

export const createDiaryService = async (payload) => {
  try {
    const createDiary = await DiaryCollection.create(payload);
    return createDiary;
  } catch (error) {
    throw new Error('Не вдалося створити завдання: ' + error.message);
  }
};

export const updateDiaryService = async (diaryId, sessionId, payload) => {
  const updatedDiary = await DiaryCollection.findOneAndUpdate(
    { _id: diaryId, sessionId },
    { $set: payload },
    { new: true },
  );

  if (!updatedDiary) return null;

  return {
    diary: updatedDiary,
    isNew: false,
  };
};

export const deleteDiaryService = async (diaryId, userId) => {
  return await DiaryCollection.findOneAndDelete({ _id: diaryId, userId });
};
