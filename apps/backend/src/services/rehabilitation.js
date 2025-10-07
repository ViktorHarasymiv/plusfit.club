// GET

import { RehabilitationCollection } from '../db/models/rehabilitation.js';

export const getAllRehabilitation = async (query, sort = { createdAt: -1 }) => {
  const data = await RehabilitationCollection.find(query).sort(sort).lean();

  return {
    data,
  };
};
