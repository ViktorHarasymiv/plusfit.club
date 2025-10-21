import { UsersCollection } from '../db/models/user';
import { SubscriptionsCollection } from '../db/models/subscriptions';

export const syncSubscriptionsToUser = async (email) => {
  const user = await UsersCollection.findOne({ email: email.toLowerCase() });
  if (!user) return;

  const subscriptions = await SubscriptionsCollection.find({
    email: email.toLowerCase(),
  });

  const existingIds = user.history.map((entry) =>
    entry.subscriptionId.toString(),
  );

  const newSubscriptions = subscriptions.filter(
    (sub) => !existingIds.includes(sub._id.toString()),
  );

  if (newSubscriptions.length === 0) return;

  newSubscriptions.forEach((sub) => {
    user.history.push({
      subscriptionId: sub._id,
      type: sub.type,
      startDate: sub.startDate,
      endDate: sub.endDate,
      price: sub.price,
      method: sub.method,
      status: sub.status,
      addedAt: new Date(),
    });

    sub.status = 'claimed'; // опціонально
  });

  await user.save();
  await Promise.all(newSubscriptions.map((sub) => sub.save()));
};
