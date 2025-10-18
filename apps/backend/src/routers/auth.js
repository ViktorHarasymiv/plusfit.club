import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserSchema, loginUserSchema } from '../validation/auth.js';

import {
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  checkSessionController,
} from '../controllers/auth.js';

import { validateBody } from '../middlewares/validateBody.js';
import { verifySession } from '../middlewares/verifySession.js';

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

export default router;
