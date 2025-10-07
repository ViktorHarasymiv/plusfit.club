import { Router } from 'express';

import { getGymPriceListController } from '../controllers/gym.js';

const router = Router();

router.get('/', getGymPriceListController);

export default router;
