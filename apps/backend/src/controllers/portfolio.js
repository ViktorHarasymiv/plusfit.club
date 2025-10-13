import { getPortfolio, createPortfolio } from '../services/portfolio.js';

import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';

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

    const photoUrl = await saveFileToUploadDir(photo);

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

// export const deleteMessageController = async (req, res, next) => {
//   const { messageId } = req.params;

//   const message = await deleteMessage(messageId);

//   if (!message) {
//     next(createHttpError(404, 'Message not found'));
//     return;
//   }

//   res.status(204).send();
// };
