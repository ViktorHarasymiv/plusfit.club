import { Router } from 'express';

import { validateBody } from '../middlewares/validateBody.js';
import { upload } from '../middlewares/multer.js';

import {
  createSlideController,
  deleteSlideController,
  getHeroSlideController,
} from '../controllers/heroSlider.js';

import { createHeroSliderSchema } from '../validation/heroSlider.js';

const router = Router();

router.get('/', validateBody(createHeroSliderSchema), getHeroSlideController);

router.post(
  '/',
  validateBody(createHeroSliderSchema),
  upload.single('backgroundImage'),
  createSlideController,
);

router.delete('/:slideId', deleteSlideController);

export default router;
