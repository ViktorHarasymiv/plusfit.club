import { SubscriptionsCollection } from '../db/models/subscriptions.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

import handlebars from 'handlebars';
import path from 'node:path';
import fs from 'node:fs/promises';

import { sendMail } from './mailer.js';
import { SMTP, TEMPLATES_DIR } from '../constants/index.js';
import { generatePdf } from '../utils/generatePdf.js';
import { getEnvVar } from '../middlewares/getEnvVar.js';

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

  const successfullyCreateSubscriptionPath = path.join(
    TEMPLATES_DIR,
    'successful-subscription.html',
  );

  const templateSource = (
    await fs.readFile(successfullyCreateSubscriptionPath)
  ).toString();

  const template = handlebars.compile(templateSource);
  const html = template({
    date: new Date().toLocaleString(),
  });

  const pdfPath = await generatePdf(payload.name);

  const info = await sendMail(
    payload.email,
    'Your request has been received',
    html,
    pdfPath,
  );

  console.log('Email send result:', info);

  // лист адміну

  const successfullyCreateSubscriptionPathAdmin = path.join(
    TEMPLATES_DIR,
    'newSubscriptionRequest.html',
  );

  const templateSourceAdmin = (
    await fs.readFile(successfullyCreateSubscriptionPathAdmin)
  ).toString();

  const templateAdmin = handlebars.compile(templateSourceAdmin);

  const htmlAdmin = templateAdmin({
    name: payload.name,
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
  });

  const infoAdmin = await sendMail(
    getEnvVar(SMTP.SMTP_ADMIN), // у .env збережи ADMIN_EMAIL
    'New subscription request',
    htmlAdmin,
  );
  console.log('Email send result (admin):', infoAdmin);

  return subscriber;
};

export const updateSubscriber = async (contactId, payload, options = {}) => {
  const rawResult = await SubscriptionsCollection.findOneAndUpdate(
    { _id: contactId },
    { $set: payload },
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  console.log(payload);

  if (!rawResult || !rawResult.value) return null;

  const updatedContact = rawResult.value;

  const successfullyVerifySubscriptionPath = path.join(
    TEMPLATES_DIR,
    'verify-subscription.html',
  );

  const templateSource = (
    await fs.readFile(successfullyVerifySubscriptionPath)
  ).toString();
  const template = handlebars.compile(templateSource);
  const html = template({
    name: updatedContact.name, // тут краще використати ім’я з бази
  });

  if (payload.isVerify === true) {
    await sendMail(
      updatedContact.email, // беремо email з документа, а не з payload
      'Your subscription has been verified ✅',
      html,
    );
  }

  return {
    contact: updatedContact,
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
