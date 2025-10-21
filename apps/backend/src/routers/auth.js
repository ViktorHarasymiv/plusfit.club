import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserSchema, loginUserSchema } from '../validation/auth.js';

import {
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  checkSessionController,
  loginAdminController,
} from '../controllers/auth.js';

import { validateBody } from '../middlewares/validateBody.js';
import { verifySession } from '../middlewares/verifySession.js';
import { loginAdminSchema } from '../validation/admin.js';
import { verifySessionAdmin } from '../middlewares/verifySessionAdmin.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post('/logout', ctrlWrapper(logoutUserController));

router.get('/session', verifySession, ctrlWrapper(checkSessionController));

router.post('/refresh', ctrlWrapper(refreshUserSessionController));

router.post(
  '/admin/login',
  validateBody(loginAdminSchema),
  ctrlWrapper(loginAdminController),
);

router.get(
  '/admin/session',
  verifySessionAdmin,
  ctrlWrapper(checkSessionController),
);

export default router;
