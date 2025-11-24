import { Router } from 'express';
import {
  getPostByIdController,
  getPostController,
} from '../controllers/post.js';

const router = Router();

router.get('/', getPostController);
router.get('/:id', getPostByIdController);

export default router;
