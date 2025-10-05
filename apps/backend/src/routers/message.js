import { Router } from 'express';

import { validateBody } from '../middlewares/validateBody.js';

import {
  createMessageSchema,
  updateMessageSchema,
} from '../validation/message.js';
import {
  createMessageController,
  getMessageController,
  patchMessageController,
} from '../controllers/message.js';

const router = Router();

router.get('/', validateBody(createMessageSchema), getMessageController);
router.post('/', validateBody(createMessageSchema), createMessageController);
router.patch(
  '/:messageId',
  validateBody(updateMessageSchema),
  patchMessageController,
);

export default router;
