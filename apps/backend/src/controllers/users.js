// Отримати поточного користувача

import createHttpError from 'http-errors';

import { AdminCollection } from '../db/models/admin.js';
import { UsersCollection } from '../db/models/user.js';
import { updateUserSchema } from '../validation/user.js';

import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../middlewares/saveFileToCloudinary.js';
import { getEnvVar } from '../middlewares/getEnvVar.js';

import { updateUser } from '../services/users.js';

export const getMeController = async (req, res) => {
  try {
    const userId = req.user?.id || req.session?.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const user = await UsersCollection.findById(userId).lean();
    if (!user) {
      return res.status(201).json({ error: 'User not found' });
    }

    const { password, ...safeUser } = user;

    res.json(safeUser);
  } catch (error) {
    console.error('getMe error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMeAdminController = async (req, res) => {
  try {
    const userId = req.user?.id || req.session?.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const user = await AdminCollection.findById(userId).lean();
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({
      ...user,
    });
  } catch (error) {
    console.error('getMe error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Оновлюємо комплексно

export const patchUserController = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.session?.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Валідація тіла запиту
    const { error, value } = updateUserSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res
        .status(400)
        .json({ error: error.details.map((d) => d.message) });
    }

    // Обробка фото

    const avatarFile = req.files?.avatar?.[0];
    const wrapperFile = req.files?.wrapper?.[0];

    let avatarUrl;
    let wrapperUrl;

    if (avatarFile) {
      avatarUrl =
        getEnvVar('ENABLE_CLOUDINARY') === 'true'
          ? await saveFileToCloudinary(avatarFile)
          : await saveFileToUploadDir(avatarFile);
    }

    if (wrapperFile) {
      wrapperUrl =
        getEnvVar('ENABLE_CLOUDINARY') === 'true'
          ? await saveFileToCloudinary(wrapperFile)
          : await saveFileToUploadDir(wrapperFile);
    }

    const updateData = { ...value };

    if (avatarUrl) updateData.avatar = avatarUrl;
    if (wrapperUrl) updateData.wrapper = wrapperUrl;

    // Уникнення порожнього pregnancy
    if (
      updateData.pregnancy &&
      Object.keys(updateData.pregnancy).length === 0
    ) {
      delete updateData.pregnancy;
    }

    const updatedUser = await updateUser(userId, updateData);

    if (!updatedUser) {
      return next(createHttpError(404, 'User not found'));
    }

    res.json({
      status: 200,
      message: 'Successfully patched a user!',
      data: updatedUser,
    });
  } catch (error) {
    console.error('patchUser error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// DELETE

export const deleteMeController = async (req, res) => {
  try {
    const userId = req.user?.id || req.session?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await UsersCollection.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await UsersCollection.findByIdAndDelete(userId);

    // Якщо ти використовуєш сесії — очищаємо
    if (req.session) {
      req.session.destroy(() => {});
    }

    res.json({ message: 'Account successfully deleted' });
  } catch (error) {
    console.error('deleteMe error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
