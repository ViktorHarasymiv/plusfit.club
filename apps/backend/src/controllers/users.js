// Отримати поточного користувача

import { UsersCollection } from '../db/models/user.js';

export const getMeController = async (req, res) => {
  try {
    const userId = req.user?.id || req.session?.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const user = await UsersCollection.findById(userId).lean();
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
