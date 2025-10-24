import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import {
  deleteSubscriber,
  getAllSubscriptions,
  createSubscriber,
  updateSubscriber,
  getSubscriberByParams,
} from '../services/subscription.js';
import { UsersCollection } from '../db/models/user.js';

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

export const getSubscriberByParamsController = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await getSubscriberByParams(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}`,
    data: contact,
  });
};

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

  const user = await UsersCollection.findOne({
    email: contact.email.toLowerCase(),
  });

  if (user) {
    // 🔁 Перевірити, чи абонемент вже є в історії
    const alreadyLinked = user.history?.some(
      (entry) => entry.subscriptionId?.toString() === contact._id.toString(),
    );

    if (!alreadyLinked) {
      // 🔗 Додати абонемент в історію
      user.history.push({
        subscriptionId: contact._id,
        clientId: contact.clientId,
        type: contact.type,
        price: contact.price,
        method: contact.method,
        status: contact.status,
        startDate: contact.startDate,
      });

      await user.save();
    }

    res.status(201).json({
      status: 201,
      message: 'Абонемент успішно створений!',
      data: contact,
    });
  }
};

export const upsertContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await updateSubscriber(
    contactId,
    {
      ...req.body,
    },
    {
      upsert: true,
    },
  );

  if (!result) {
    next(createHttpError(404, 'Subscriber not found'));
    return;
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upserted a subscriber!`,
    data: result.contact,
  });
};
