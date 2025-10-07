import { getAllGymPriceList } from '../services/gym.js';

// ALL

export const getGymPriceListController = async (req, res) => {
  try {
    const query = req.query || {};
    const massage = await getAllGymPriceList(query);
    res.status(200).json({
      status: 200,
      message: 'Успішно завантажено прайс лист для тренажерного залу !',
      result: massage,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Помилка при отриманні абонементів !',
      error: error.message,
    });
  }
};
