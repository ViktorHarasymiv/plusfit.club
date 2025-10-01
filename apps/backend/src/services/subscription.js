import { SubscriptionsCollection } from '../db/models/subscriptions.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllSubscriptions = async ({ page = 1, perPage = 10 }) => {
  const skip = (page - 1) * perPage;

  const [totalCount, subscriptions] = await Promise.all([
    SubscriptionsCollection.countDocuments(),
    SubscriptionsCollection.find().skip(skip).limit(perPage).exec(),
  ]);

  const pagination = calculatePaginationData(totalCount, perPage, page);

  return {
    data: subscriptions,
    ...pagination,
  };
};

export const getSubscriberByParams = async (contactById) => {
  const contact = await SubscriptionsCollection.findOne({
    clientId: contactById,
  });
  return contact;
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
