import { SORT_ORDER } from '../constants/index.js';
import { PostCollection } from '../db/models/post.js';

import { calculatePaginationData } from '../utils/calculatePaginationData.js';

// GET

export const getAllPost = async ({
  page = 1,
  perPage = 6,
  sortOrder = SORT_ORDER.DESC,
  sortBy = 'createdAt',
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const postCount = await PostCollection.countDocuments();

  const posts = await PostCollection.find()
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

// FETCH BY ID

export const getPostById = async (id) => {
  if (!id) throw new Error('Id is required');

  try {
    const post = await PostCollection.findById(id);
    if (!post) {
      throw new Error(`Post with id ${id} not found`);
    }
    return post;
  } catch (error) {
    console.error('Error fetching post by id:', error);
    throw error;
  }
};

// PATCH LIKE

export const toggleLike = async (postId, userId) => {
  if (!postId || !userId) throw new Error("postId і userId обов'язкові");

  try {
    const post = await getPostById(postId);

    if (!post.likedBy) post.likedBy = [];

    const alreadyLiked = post.likedBy.includes(userId);

    if (alreadyLiked) {
      // якщо вже лайкнув — прибираємо лайк
      post.likedBy = post.likedBy.filter((u) => u !== userId);
    } else {
      // якщо ще не лайкнув — додаємо
      post.likedBy.push(userId);
    }

    // кількість лайків = довжина масиву
    post.likes = post.likedBy.length;

    await post.save();

    return post;
  } catch (error) {
    console.error('Error toggling like:', error);
    throw error;
  }
};

// SEARCH

export async function searchPostsByTitle(query) {
  try {
    const posts = await PostCollection.find({
      title: { $regex: query, $options: 'i' },
    });
    return posts;
  } catch (error) {
    throw new Error('Помилка при пошуку постів: ' + error.message);
  }
}
