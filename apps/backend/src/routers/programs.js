import { Router } from 'express';
import {
  getAllPrograms,
  getProgramById,
  getProgramsList,
} from '../controllers/trainingProgramController.js';

const router = Router();

router.get('/', getAllPrograms);
router.get('/list', getProgramsList);
router.get('/:id', getProgramById);

export default router;
