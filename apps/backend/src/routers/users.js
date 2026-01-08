import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';

import {
  deleteMeController,
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
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'wrapper', maxCount: 1 },
  ]),

  verifySession,
  validateBody(updateUserSchema),
  ctrlWrapper(patchUserController),
);

router.delete('/delete', verifySession, ctrlWrapper(deleteMeController));

export default router;
