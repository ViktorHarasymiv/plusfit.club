import createHttpError from 'http-errors';

import { SubscriptionsCollection } from '../db/models/subscriptions';

export const checkId = async (req, res, next) => {
  const { user } = req;
  const { userId } = req.params;

  if (!user) {
    next(createHttpError(401));
    return;
  }

  const users = await SubscriptionsCollection.findOne({
    _id: userId,
    userId: user._id,
  });

  if (users) {
    next();
    return;
  }

  next(createHttpError(403));
};
