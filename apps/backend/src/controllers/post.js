import { getAllPost } from '../services/posts.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';

/* Решта коду файла */

export const getPostController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);

  const { sortBy, sortOrder } = parseSortParams(req.query);

  const posts = await getAllPost({
    page,
    perPage,
    sortBy,
    sortOrder,
  });

  res.json({
    status: 200,
    message: 'Успішно завантажено пости !',
    data: posts,
  });
};
