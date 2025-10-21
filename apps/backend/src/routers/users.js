import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';

import {
  getMeAdminController,
  getMeController,
  patchUserController,
} from '../controllers/users.js';
import { verifySession } from '../middlewares/verifySession.js';
import { verifySessionAdmin } from '../middlewares/verifySessionAdmin.js';
import { updateUserSchema } from '../validation/user.js';

import { upload } from '../middlewares/multer.js';

const router = Router();

router.get('/me', verifySession, ctrlWrapper(getMeController));

router.get('/admin/me', verifySessionAdmin, ctrlWrapper(getMeAdminController));

router.patch(
  '/me',
  upload.single('avatar'),
  verifySession,
  validateBody(updateUserSchema),
  ctrlWrapper(patchUserController),
);

export default router;
