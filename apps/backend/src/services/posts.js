import { SORT_ORDER } from '../constants/index.js';
import { PostCollection } from '../db/models/post.js';

import { calculatePaginationData } from '../utils/calculatePaginationData.js';

// GET

export const getAllPost = async ({
  page = 1,
  perPage = 8,
  sortOrder = SORT_ORDER.ASC,
  sortBy = 'createdAt',
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const postQuery = PostCollection.find();

  const postCount = await PostCollection.find()
    .merge(postQuery)
    .countDocuments();

  const posts = await postQuery
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(limit)
    .exec();

  const paginationData = calculatePaginationData(postCount, perPage, page);

  return {
    data: posts,
    ...paginationData,
  };
};
