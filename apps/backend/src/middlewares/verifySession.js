import { SessionsCollection } from '../db/models/session.js';
import { UsersCollection } from '../db/models/admin.js';

export const verifySession = async (req, res, next) => {
  try {
    const { sessionId } = req.cookies;

    if (!sessionId) {
      return res
        .status(401)
        .json({ message: console.Console.log('Сесія не знайдена') });
    }

    const session = await SessionsCollection.findById(sessionId);
    if (!session || session.accessTokenValidUntil < new Date()) {
      return res
        .status(401)
        .json({ message: 'Сесія недійсна або протермінована' });
    }

    const user = await UsersCollection.findById(session.userId);
    if (!user) {
      return res.status(404).json({ message: 'Користувач не знайдений' });
    }

    req.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    console.log('Cесія створена');

    next();
  } catch (error) {
    console.error('Помилка перевірки сесії:', error);
    res.status(500).json({ message: 'Внутрішня помилка сервера' });
  }
};
