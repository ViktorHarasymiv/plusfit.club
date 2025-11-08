import { Router } from 'express';
import { getPostController } from '../controllers/post.js';

const router = Router();

router.get('/', getPostController);

export default router;
