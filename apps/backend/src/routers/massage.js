import { Router } from 'express';

import { getMassageController } from '../controllers/massage.js';

const router = Router();

router.get('/', getMassageController);

export default router;
