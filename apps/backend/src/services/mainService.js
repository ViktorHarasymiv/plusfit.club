import { MainCollection } from '../db/models/main.js';

export const getMainService = async () => {
  const mainSetup = await MainCollection.findOne().lean();

  return {
    data: mainSetup,
  };
};

export const updateMainConfig = async (payload) => {
  const updatedConfig = await MainCollection.findOneAndUpdate(
    {}, // шукаємо перший документ (бо це глобальні налаштування)
    { $set: payload },
    { upsert: true, new: true },
  );

  return {
    data: updatedConfig,
  };
};
