import { Router } from 'express';

import subscriptionsRouter from './subscription.js';
import authRouter from './auth.js';
import reviewRouter from './review.js';
import messageRouter from './message.js';
import massageRouter from './massage.js';
import rehabilitationRouter from './rehabilitation.js';

const router = Router();

router.use('/subscriptions', subscriptionsRouter);
router.use('/auth', authRouter);
router.use('/review', reviewRouter);
router.use('/message', messageRouter);
router.use('/massage', massageRouter);
router.use('/rehabilitation', rehabilitationRouter);

export default router;
