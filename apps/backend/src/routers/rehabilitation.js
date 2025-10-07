import { Router } from 'express';

import { getRehabilitationController } from '../controllers/rehabilitation.js';

const router = Router();

router.get('/', getRehabilitationController);

export default router;
