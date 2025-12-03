import { Router } from 'express';
import {
  getPostByIdController,
  getPostController,
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

export default router;
