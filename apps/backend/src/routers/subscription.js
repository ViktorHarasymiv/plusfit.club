import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import { isValidId } from '../middlewares/isValidId.js';

import { validateBody } from '../middlewares/validateBody.js';

import {
  deleteSubscriberController,
  getSubscriberByParamsController,
  getSubscriptionsController,
  createSubscriberController,
  upsertContactController,
  getSubscriptionsByEmailController,
  getFilteredSubscriberCountController,
} from '../controllers/subscription.js';

import {
  createSubscriptionSchema,
  updateSubscriptionSchema,
} from '../validation/subscriber.js';

const router = Router();

router.get('/', ctrlWrapper(getSubscriberByParamsController));
router.get('/count', getFilteredSubscriberCountController);

router.get('/my', ctrlWrapper(getSubscriptionsByEmailController));

router.post(
  '/',
  validateBody(createSubscriptionSchema),
  createSubscriberController,
);

router.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(deleteSubscriberController),
);

router.put(
  '/:contactId',
  isValidId,
  validateBody(updateSubscriptionSchema),
  ctrlWrapper(upsertContactController),
);

export default router;
