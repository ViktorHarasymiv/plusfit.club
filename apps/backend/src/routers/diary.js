import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getUserDiaryController,
  createDiaryController,
  updateDiaryController,
  deleteDiaryController,
} from '../controllers/diary.js';
import { createDiarySchema, updateDiarySchema } from '../validation/diary.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = Router();

router.get('/', ctrlWrapper(getUserDiaryController));

router.post(
  '/',
  validateBody(createDiarySchema),
  ctrlWrapper(createDiaryController),
);

router.patch(
  '/:id',
  validateBody(updateDiarySchema),
  ctrlWrapper(updateDiaryController),
);

router.delete('/:id', ctrlWrapper(deleteDiaryController));

export default router;
