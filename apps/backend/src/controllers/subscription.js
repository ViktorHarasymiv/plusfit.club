import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import {
  deleteSubscriber,
  getAllSubscriptions,
  createSubscriber,
  updateSubscriber,
  getSubscriberByParams,
  getSubscriptionsByEmail,
} from '../services/subscription.js';
import { SubscriptionsCollection } from '../db/models/subscriptions.js';

// NONE

export const getSubscriptionsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const subscriptions = await getAllSubscriptions({
    page,
    perPage,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found subscribers!',
    result: subscriptions,
  });
};

// GET

export const getSubscriberByParamsController = async (req, res, next) => {
  try {
    const { page = 1, perPage = 8, ...subscriptionsParams } = req.query;

    // Приведення типів, якщо потрібно
    if (subscriptionsParams.isVerify !== undefined) {
      subscriptionsParams.isVerify = subscriptionsParams.isVerify === 'true';
    }

    const subscriptions = await getSubscriberByParams({
      subscriptionsParams,
      page: Number(page),
      perPage: Number(perPage),
    });

    if (!subscriptions || subscriptions.data.length === 0) {
      return res.status(200).json({
        status: 200,
        message: 'No subscriptions matched the filters',
        data: [],
        pagination: {
          page: Number(page),
          perPage: Number(perPage),
          totalCount: 0,
          totalPages: 0,
        },
      });
    }

    res.json({
      status: 200,
      message: 'Successfully found subscriptions',
      data: subscriptions.data,
      pagination: {
        ...subscriptions,
        data: undefined,
      },
    });
  } catch (error) {
    console.error('❌ Controller error:', error);
    next(error);
  }
};

// COUNT

export const getFilteredSubscriberCountController = async (req, res, next) => {
  try {
    const rawParams = { ...req.query };
    const filters = {};

    //  Приведення типів
    if ('isVerify' in rawParams) {
      filters.isVerify = rawParams.isVerify === 'true';
    }

    const count = await SubscriptionsCollection.countDocuments(filters);

    res.status(200).json({
      status: 200,
      message: 'Successfully counted filtered subscriptions',
      count,
    });
  } catch (error) {
    console.error('❌ Count controller error:', error);
    next(
      createHttpError(500, error.message || 'Failed to count subscriptions'),
    );
  }
};

// DELETE

export const deleteSubscriberController = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await deleteSubscriber(contactId);

  if (!contact) {
    next(createHttpError(404, 'Subscriber not found'));
    return;
  }

  res.status(204).send();
};

export const createSubscriberController = async (req, res) => {
  const contactData = {
    ...req.body,
  };
  const contact = await createSubscriber(contactData);

  res.status(201).json({
    status: 201,
    message: 'Абонемент успішно створений!',
    data: contact,
  });
};

export const upsertContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await updateSubscriber(
    contactId,
    { ...req.body },
    { upsert: true },
  );

  const contact = result.contact;

  if (!result) {
    next(createHttpError(404, 'Subscriber not found'));
    return;
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Успішно оновлено абонемент !`,
    data: contact,
  });
};

export const getSubscriptionsByEmailController = async (req, res, next) => {
  const { email } = req.query;

  try {
    if (!email) {
      throw createHttpError(400, 'Email is required');
    }

    const subscriptions = await getSubscriptionsByEmail(email);

    res.status(200).json({
      status: 200,
      message: 'Абонементи знайдено',
      data: subscriptions,
    });
  } catch (error) {
    next(
      createHttpError(500, error.message || 'Помилка при пошуку абонементів'),
    );
  }
};
