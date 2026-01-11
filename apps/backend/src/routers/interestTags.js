import { Router } from 'express';
import { InterestCollection } from '../db/models/interestTags.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const interests = await InterestCollection.find({}, '_id tag');
    res.json({
      status: 200,
      message: 'Successfully get interests',
      data: interests,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
