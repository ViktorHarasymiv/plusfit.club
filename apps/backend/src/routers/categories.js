import { Router } from 'express';
import { CategoryCollection } from '../db/models/category.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const category = await CategoryCollection.find({}, '_id title');
    res.json({
      status: 200,
      message: 'Successfully get category',
      data: category,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
