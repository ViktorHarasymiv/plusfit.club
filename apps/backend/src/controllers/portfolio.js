import fs from 'fs/promises';
import path from 'path';

import createHttpError from 'http-errors';
import {
  getPortfolio,
  createPortfolio,
  deletePhoto,
} from '../services/portfolio.js';

import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../middlewares/saveFileToCloudinary.js';
import { getEnvVar } from '../middlewares/getEnvVar.js';

// ALL

export const getPortfolioController = async (req, res) => {
  const portfolio = await getPortfolio();

  res.status(200).json({
    status: 200,
    message: 'Successfully loaded portfolio!',
    result: portfolio,
  });
};

// CREATE

export const createPortfolioController = async (req, res, next) => {
  try {
    const { alt, section } = req.body;
    const photo = req.file;

    if (!photo) {
      return res.status(400).json({ message: 'Файл не передано' });
    }

    let photoUrl;

    if (photo) {
      photoUrl =
        getEnvVar('ENABLE_CLOUDINARY') === 'true'
          ? await saveFileToCloudinary(photo)
          : await saveFileToUploadDir(photo);
    }

    const portfolio = await createPortfolio({ alt, section, photo: photoUrl });

    console.log('✅ Файл:', req.file);
    console.log('✅ Створено:', portfolio);

    res.status(201).json({
      status: 201,
      message: 'Елемент успішно створений!',
      data: portfolio,
    });
  } catch (err) {
    console.error('❌ Контролер впав:', err);
    res
      .status(500)
      .json({ message: 'Помилка при створенні елементу', error: err.message });
  }
};

// DELETE

export const deletePortfolioController = async (req, res, next) => {
  const { photoId } = req.params;
  const { filename } = req.body;

  const photo = await deletePhoto(photoId);

  if (!photo) {
    next(createHttpError(404, 'Photo not found'));
    return;
  }

  if (filename) {
    const filePath = path.join(
      process.cwd(),
      'uploads',
      filename.split('/').pop(),
    );

    try {
      await fs.unlink(filePath);
      console.log(`Deleted file: ${filePath}`);
    } catch (err) {
      console.log(err);
      console.warn(`File not found or already deleted: ${filePath}`);
    }
  }

  res.status(204).send();
};
