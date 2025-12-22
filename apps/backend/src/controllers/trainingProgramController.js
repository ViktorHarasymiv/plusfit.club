import {
  getAllProgramsService,
  getListProgramsService,
  getProgramByIdService,
} from '../services/trainingProgramServices.js';

// ALL

export const getAllPrograms = async (req, res) => {
  try {
    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    console.log('USER ID FROM QUERY:', userId);

    const programs = await getAllProgramsService(userId);

    res.json(programs);
  } catch (error) {
    console.error('Error fetching programs:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// LIST

export const getProgramsList = async (req, res) => {
  try {
    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }

    const programs = await getListProgramsService(userId);

    res.json(programs);
  } catch (error) {
    console.error('Error fetching program list:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// BY ID

export const getProgramById = async (req, res) => {
  try {
    const { id } = req.params;

    const program = await getProgramByIdService(id);

    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }

    res.json(program);
  } catch (error) {
    console.error('Error fetching program:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
