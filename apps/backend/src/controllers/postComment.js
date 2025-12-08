import { postCommentCollection } from '../db/models/postComment.js';
import { UsersCollection } from '../db/models/user.js';
import { getPostComments } from '../services/postCommentServices.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';

export const createPostCommentController = async (req, res) => {
  try {
    const { postId, userId, text } = req.body;

    const user = await UsersCollection.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const comment = new postCommentCollection({
      postId,
      userId,
      text,
      userSnapshot: {
        name: user.name,
        avatar: user.avatar,
        role: user.role,
      },
    });

    await comment.save();

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPostCommentController = async (req, res) => {
  try {
    const { postId } = req.params;

    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);

    // Валідація postId (якщо це Mongo ObjectId)
    if (!postId || !/^[0-9a-fA-F]{24}$/.test(postId)) {
      return res.status(400).json({ message: 'Invalid postId format' });
    }

    const commentsResult = await getPostComments(postId, {
      page: page || 1,
      perPage: Math.min(perPage || 3, 50), // максимум 50
      sortBy,
      sortOrder,
    });

    // Завжди повертаємо однакову структуру
    return res.status(200).json({
      data: commentsResult.data || [],
      totalItems: commentsResult.totalItems || 0,
      totalPages: commentsResult.totalPages || 0,
      currentPage: commentsResult.currentPage || page || 1,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
