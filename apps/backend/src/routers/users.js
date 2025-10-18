import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getMeController } from '../controllers/users.js';
import { verifySession } from '../middlewares/verifySession.js';

const router = Router();

router.get('/me', verifySession, ctrlWrapper(getMeController));
// router.post('/avatar', upload.single('avatar'), ctrlWrapper(updateAvatar));

// router.patch(
//   '/',
//   upload.single('avatar'),
//   validateBody(updateUserSchema),
//   ctrlWrapper(patchUserController),
// );

export default router;
