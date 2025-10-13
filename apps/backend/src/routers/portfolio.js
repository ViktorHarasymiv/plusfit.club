import { Router } from 'express';

import { validateBody } from '../middlewares/validateBody.js';
import { upload } from '../middlewares/multer.js';

import {
  createPortfolioController,
  deletePortfolioController,
  getPortfolioController,
} from '../controllers/portfolio.js';
import { portfolioValidationSchema } from '../validation/portfolio.js';

const router = Router();

router.get(
  '/',
  validateBody(portfolioValidationSchema),
  getPortfolioController,
);

router.post(
  '/',
  validateBody(portfolioValidationSchema),
  upload.single('photo'),
  createPortfolioController,
);

router.delete('/:photoId', deletePortfolioController);

export default router;
