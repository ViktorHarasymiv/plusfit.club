import { Router } from 'express';
import {
  getAllPrograms,
  getProgramById,
  getProgramsList,
  updateProgramController,
} from '../controllers/trainingProgramController.js';

const router = Router();

router.get('/', getAllPrograms);
router.get('/list', getProgramsList);
router.get('/:id', getProgramById);
router.patch('/:id', updateProgramController);

export default router;
