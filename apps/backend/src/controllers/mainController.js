import createHttpError from 'http-errors';
import { getMainService, updateMainConfig } from '../services/mainService.js';

// GET

export const getMainConfig = async (req, res) => {
  try {
    const { data, error } = await getMainService();

    if (error) {
      return res.status(500).json({ error });
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully loaded main config',
      data,
    });
  } catch (error) {
    console.error('Error(main):', error);
    res.status(500).json({ error: 'Unexpected server error' });
  }
};

// PUT

export const upsertMainController = async (req, res, next) => {
  try {
    const result = await updateMainConfig(req.body);

    if (!result) {
      return next(createHttpError(404, 'Config not found'));
    }

    res.status(200).json({
      status: 200,
      message: 'Успішно оновлено налаштування сайту!',
      data: result,
    });
  } catch (error) {
    next(createHttpError(500, error.message));
  }
};
