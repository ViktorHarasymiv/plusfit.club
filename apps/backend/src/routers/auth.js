import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { loginUserSchema } from '../validation/auth.js';
import { verifySession } from '../middlewares/verifySession.js';

import {
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = Router();

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post('/logout', ctrlWrapper(logoutUserController));

router.get('/check-session', verifySession, (req, res) => {
  res.status(200).json({
    message: 'Сесія активна',
    user: req.user, // 👈 передаємо дані користувача
  });
});

router.post('/refresh', ctrlWrapper(refreshUserSessionController));

export default router;
