import { getAllRehabilitation } from '../services/rehabilitation.js';

// ALL

export const getRehabilitationController = async (req, res) => {
  try {
    const query = req.query || {};
    const rehabilitation = await getAllRehabilitation(query);
    res.status(200).json({
      status: 200,
      message: 'Успіх при отримані прайс листа !',
      result: rehabilitation,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Помилка при отриманні данних!',
      error: error.message,
    });
  }
};
