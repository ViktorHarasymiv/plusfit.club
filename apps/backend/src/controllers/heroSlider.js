import createHttpError from 'http-errors';

import {
  createSlide,
  deleteSlide,
  getAllSlide,
} from '../services/heroSlider.js';
import { saveFileToCloudinary } from '../middlewares/saveFileToCloudinary.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { getEnvVar } from '../middlewares/getEnvVar.js';

// GET

export const getHeroSlideController = async (req, res) => {
  const slide = await getAllSlide();

  res.status(200).json({
    status: 200,
    message: 'Successfully loaded slide!',
    result: slide,
  });
};

// CREATE

export const createSlideController = async (req, res) => {
  const {
    greeting,
    about,
    'title.base': titleBase,
    'title.accent': titleAccent,
    'title.baseFinish': titleBaseFinish,
    action,
  } = req.body;

  const image = req.file;

  if (!image) {
    return res.status(400).json({ message: 'Файл не передано' });
  }

  let photoUrl;

  try {
    photoUrl =
      getEnvVar('ENABLE_CLOUDINARY') === 'true'
        ? await saveFileToCloudinary(image)
        : await saveFileToUploadDir(image);

    const slide = await createSlide({
      greeting,
      about,
      title: {
        base: titleBase,
        accent: titleAccent,
        baseFinish: titleBaseFinish,
      },
      action: Array.isArray(action) ? action : [action],
      backgroundImage: photoUrl,
    });

    res.status(201).json({
      status: 201,
      message: 'Слайд успішно створений!',
      data: slide,
    });
  } catch (error) {
    res.status(500).json({ message: 'Помилка створення слайду', error });
  }
};

// DELETE

export const deleteSlideController = async (req, res, next) => {
  const { slideId } = req.params;

  const slide = await deleteSlide(slideId);

  if (!slide) {
    next(createHttpError(404, 'Слайд не знайдено !'));
    return;
  }

  res.status(204).send();
};
