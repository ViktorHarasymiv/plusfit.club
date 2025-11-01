import { Router } from 'express';

import subscriptionsRouter from './subscription.js';
import authRouter from './auth.js';
import usersRouter from './users.js';
import heroRouter from './hero.js';
import reviewRouter from './review.js';
import messageRouter from './message.js';
import massageRouter from './massage.js';
import rehabilitationRouter from './rehabilitation.js';
import gymRouter from './gym.js';
import portfolioRouter from './portfolio.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);

router.use('/subscriptions', subscriptionsRouter);

router.use('/hero', heroRouter);
router.use('/review', reviewRouter);
router.use('/message', messageRouter);
router.use('/massage', massageRouter);
router.use('/rehabilitation', rehabilitationRouter);
router.use('/gym', gymRouter);
router.use('/portfolio', portfolioRouter);

export default router;
