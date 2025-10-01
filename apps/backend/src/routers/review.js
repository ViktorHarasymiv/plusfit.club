import { Router } from 'express';

import { validateBody } from '../middlewares/validateBody.js';

import {
  allReviewsController,
  createReviewsController,
} from '../controllers/review.js';

import { createReviewSchema, getReviewSchema } from '../validation/review.js';

const router = Router();

router.get('/', validateBody(getReviewSchema), allReviewsController);
router.post('/', validateBody(createReviewSchema), createReviewsController);

export default router;
