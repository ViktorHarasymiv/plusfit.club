import { SORT_ORDER } from '../constants/index.js';

import { postCommentCollection } from '../db/models/postComment.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export async function getPostComments(
  postId,
  { page = 1, perPage = 2, sortOrder = SORT_ORDER.ASC, sortBy = 'createdAt' },
) {
  try {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    // Фільтруємо коментарі по postId
    const commentsCount = await postCommentCollection.countDocuments({
      postId,
    });

    const comments = await postCommentCollection
      .find({ postId }) // ✅ додаємо фільтр
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .exec();

    const paginationData = calculatePaginationData(
      commentsCount,
      perPage,
      page,
    );

    return {
      data: comments,
      ...paginationData,
    };
  } catch (error) {
    throw new Error('Помилка при отриманні коментарів: ' + error.message);
  }
}
