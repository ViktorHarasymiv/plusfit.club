import createHttpError from 'http-errors';
import {
  categoryCountService,
  createPost,
  getAllPost,
  getPostById,
  getRecentByLikesService,
  searchPostsByTitle,
  toggleLike,
} from '../services/posts.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';

// FETCH ALL POST

export const getPostController = async (req, res) => {
  try {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);

    const { tags, filterBy, category } = req.query;

    const {
      data: posts,
      totalItems,
      totalPages,
      currentPage,
    } = await getAllPost({
      page,
      perPage,
      sortBy,
      sortOrder,
      tags,
      filterBy,
      category,
    });

    res.json({
      status: 200,
      message: 'Posts successfully loaded!',
      posts,
      totalItems,
      totalPages,
      currentPage,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Error loading posts',
      error: error.message,
    });
  }
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

// GET POST BY CATEGORY COUNT

export const getCategoryCounts = async (req, res) => {
  try {
    const result = await categoryCountService();
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Помилка при підрахунку категорій' });
  }
};

// GET RECENT POSTS

export const getRecentByLikesController = async (req, res) => {
  try {
    const posts = await getRecentByLikesService();
    res.json(posts);
  } catch (err) {
    res.status(500).json({
      message: 'Помилка при отриманні популярних постів',
    });
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

// CREATE

export const createPostController = async (req, res) => {
  const payload = {
    ...req.body,
  };
  const newPost = await createPost(payload);

  res.status(201).json({
    status: 201,
    message: 'Пост успішно створений!',
    data: newPost,
  });
};
