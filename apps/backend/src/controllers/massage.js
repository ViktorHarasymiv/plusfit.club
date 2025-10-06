import { getAllMassage } from '../services/massage.js';

// ALL

export const getMassageController = async (req, res) => {
  try {
    const query = req.query || {};
    const massage = await getAllMassage(query);
    res.status(200).json({
      status: 200,
      message: 'Successfully found massage price list!',
      result: massage,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Помилка при отриманні масажів',
      error: error.message,
    });
  }
};
