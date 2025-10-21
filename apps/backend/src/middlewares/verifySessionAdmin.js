import { AdminCollection } from '../db/models/admin.js';
import { SessionsCollection } from '../db/models/session.js';

export const verifySessionAdmin = async (req, res, next) => {
  try {
    const { sessionId } = req.cookies;

    if (!sessionId) {
      console.log('Сесія не знайдена');
      return res.status(401).json({ message: 'Сесія не знайдена' });
    }

    const session = await SessionsCollection.findById(sessionId);

    if (!session || new Date(session.accessTokenValidUntil) < new Date()) {
      return res
        .status(401)
        .json({ message: 'Сесія недійсна або протермінована' });
    }

    const user = await AdminCollection.findById(session.userId);
    if (!user) {
      return res.status(404).json({ message: 'Користувач не знайдений' });
    }

    req.user = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    console.log('Cесія створена');

    next();
  } catch (error) {
    console.error('Помилка перевірки сесії:', error);
    res.status(500).json({ message: 'Внутрішня помилка сервера' });
  }
};
