import { Router } from 'express';
import {
  createProgramController,
  getAllPrograms,
  getProgramById,
  getProgramsList,
  updateProgramController,
} from '../controllers/trainingProgramController.js';

const router = Router();

router.get('/', getAllPrograms);
router.get('/list', getProgramsList);
router.get('/:id', getProgramById);

router.post('/', createProgramController);

router.patch('/:id', updateProgramController);

export default router;
