import { SubscriptionsCollection } from '../db/models/subscriptions.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllSubscriptions = async ({ page = 1, perPage = 8 }) => {
  const skip = (page - 1) * perPage;

  const [totalCount, subscriptions] = await Promise.all([
    SubscriptionsCollection.countDocuments(),
    SubscriptionsCollection.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(perPage)
      .lean()
      .exec(),
  ]);

  const pagination = calculatePaginationData(totalCount, perPage, page);

  return {
    data: subscriptions,
    ...pagination,
  };
};

export const getSubscriberByParams = async ({
  page = 1,
  perPage = 8,
  subscriptionsParams = {},
}) => {
  const skip = (page - 1) * perPage;

  const [totalCount, subscriptions] = await Promise.all([
    SubscriptionsCollection.countDocuments(subscriptionsParams),
    SubscriptionsCollection.find(subscriptionsParams)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(perPage)
      .exec(),
  ]);

  const pagination = calculatePaginationData(totalCount, perPage, page);

  return {
    data: subscriptions,
    ...pagination,
  };
};

export const deleteSubscriber = async (contactId) => {
  const contact = await SubscriptionsCollection.findOneAndDelete({
    _id: contactId,
  });

  return contact;
};

export const createSubscriber = async (payload) => {
  const subscriber = await SubscriptionsCollection.create(payload);
  return subscriber;
};

export const updateSubscriber = async (contactId, payload, options = {}) => {
  const rawResult = await SubscriptionsCollection.findOneAndUpdate(
    {
      _id: contactId,
    },
    { $set: payload },
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const getSubscriptionsByEmail = async (email) => {
  if (!email) throw new Error('Email is required');

  const normalizedEmail = email.toLowerCase();

  const subscriptions = await SubscriptionsCollection.find({
    email: normalizedEmail,
  }).sort({ createdAt: -1 });

  return subscriptions;
};
