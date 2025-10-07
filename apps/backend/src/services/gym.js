// GET

import { GymCollection } from '../db/models/gym.js';

export const getAllGymPriceList = async (query, sort = { createdAt: -1 }) => {
  const data = await GymCollection.find(query).sort(sort).lean();

  return {
    data,
  };
};
