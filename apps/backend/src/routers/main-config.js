import { Router } from 'express';

import { validateBody } from '../middlewares/validateBody.js';

import {
  getMainConfig,
  upsertMainController,
} from '../controllers/mainController.js';
import { mainValidationSchema } from '../validation/main.js';

const router = Router();

router.put('/', validateBody(mainValidationSchema), upsertMainController);
router.get('/', getMainConfig);

export default router;
