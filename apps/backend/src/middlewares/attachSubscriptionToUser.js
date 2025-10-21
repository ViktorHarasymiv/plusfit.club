// src/middleware/attachSubscriptionToUser.js

import { SubscriptionsCollection } from '../db/models/subscriptions.js';
import { UsersCollection } from '../db/models/user.js';

export const attachSubscriptionToUser = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      console.warn('📭 No email provided for subscription lookup');
      return next();
    }

    // Знайти користувача, щойно створеного
    const user = await UsersCollection.findOne({ email });
    if (!user) {
      console.warn(`👤 User with email ${email} not found`);
      return next();
    }

    // Знайти абонемент з таким email
    const subscription = await SubscriptionsCollection.findOne({ email });
    if (!subscription) {
      console.log(`📄 No subscription found for ${email}`);
      return next();
    }

    // Перевірити, чи абонемент вже прив’язаний
    const alreadyLinked = user.history?.some(
      (entry) =>
        entry.subscriptionId?.toString() === subscription._id.toString(),
    );
    if (alreadyLinked) {
      console.log(`🔁 Subscription already linked to user ${email}`);
      return next();
    }

    // Додати абонемент в історію
    user.history.push({
      subscriptionId: subscription._id,
      type: subscription.type,
      startDate: subscription.startDate,
      endDate: subscription.endDate,
      price: subscription.price,
      method: subscription.method,
      status: subscription.status,
      addedAt: new Date(),
    });

    await user.save();

    // Позначити абонемент як використаний (опціонально)
    subscription.status = 'claimed';
    await subscription.save();

    console.log(`✅ Subscription linked to user ${email}`);
    next();
  } catch (error) {
    console.error('❌ Error in attachSubscriptionToUser middleware:', error);
    next(error);
  }
};
