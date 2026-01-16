import { Router } from 'express';
import {
  createPostController,
  getCategoryCounts,
  getPostByIdController,
  getPostController,
  getRecentByLikesController,
  likePostController,
  searchPostsController,
} from '../controllers/post.js';
import {
  createPostCommentController,
  deletePostCommentByIdController,
  getPostCommentController,
  getPostCommentsByUserIdController,
} from '../controllers/postComment.js';

const router = Router();

// POSTS
router.get('/', getPostController);
router.post('/', createPostController);
router.get('/search', searchPostsController);

router.get('/category-counts', getCategoryCounts);
router.get('/recent-by-likes', getRecentByLikesController);

// COMMENTS
router.post('/comments', createPostCommentController);

// get comments for a post
router.get('/comments/post/:postId', getPostCommentController);

// get comments by user
router.get('/comments/user/:userId', getPostCommentsByUserIdController);

// like post
router.patch('/:postId/like', likePostController);

// delete comment by id

router.delete('/comments/:commentId', deletePostCommentByIdController);

router.get('/:id', getPostByIdController);

export default router;
