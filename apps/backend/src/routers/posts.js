import { Router } from 'express';
import {
  getPostByIdController,
  getPostController,
  likePostController,
} from '../controllers/post.js';
import {
  createPostCommentController,
  getPostCommentController,
} from '../controllers/postComment.js';

const router = Router();

router.get('/', getPostController);
router.get('/:id', getPostByIdController);

router.post('/comments', createPostCommentController);
router.get('/comments/:postId', getPostCommentController);

router.patch('/:postId/like', likePostController);

export default router;
