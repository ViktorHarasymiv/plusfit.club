// GET

import { MassageCollection } from '../db/models/massage.js';

export const getAllMassage = async (query, sort = { createdAt: -1 }) => {
  const data = await MassageCollection.find(query).sort(sort).lean();

  return {
    data,
  };
};
