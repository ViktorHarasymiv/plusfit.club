import createHttpError from 'http-errors';
import {
  getAllPost,
  getPostById,
  searchPostsByTitle,
  toggleLike,
} from '../services/posts.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';

// FETCH ALL POST

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

// FETCH POST BY ID

export const getPostByIdController = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!id) {
      throw createHttpError(400, 'Id is required');
    }

    const post = await getPostById(id);

    if (!post) {
      throw createHttpError(404, `Пост з id ${id} не знайдено`);
    }

    res.status(200).json({
      status: 200,
      message: 'Пост знайдено',
      data: post,
    });
  } catch (error) {
    next(
      createHttpError(
        error.status || 500,
        error.message || 'Помилка при пошуку поста',
      ),
    );
  }
};

//  LIKE

export const likePostController = async (req, res) => {
  const { postId } = req.params; // правильна назва параметра
  const { userId } = req.body; // id користувача

  try {
    const updatedPost = await toggleLike(postId, userId);
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// SEARCH

export async function searchPostsController(req, res) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Параметр 'query' обов'язковий" });
  }

  try {
    const posts = await searchPostsByTitle(query);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
