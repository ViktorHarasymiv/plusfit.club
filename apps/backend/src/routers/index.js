import { Router } from 'express';

import subscriptionsRouter from './subscription.js';
import authRouter from './auth.js';
import reviewRouter from './review.js';

const router = Router();

router.use('/subscriptions', subscriptionsRouter);
router.use('/auth', authRouter);
router.use('/review', reviewRouter);

export default router;
