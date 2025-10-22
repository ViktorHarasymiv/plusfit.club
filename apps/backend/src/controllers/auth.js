import {
  registerUser,
  loginUser,
  logoutUser,
  loginAdmin,
} from '../services/auth.js';
import { refreshUsersSession } from '../services/auth.js';

import { generateAuthUrl } from '../utils/googleOAuth2.js';

import { loginOrSignupWithGoogle } from '../services/auth.js';

import { ONE_DAY } from '../constants/index.js';
import { SubscriptionsCollection } from '../db/models/subscriptions.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  const session = await loginUser(req.body);

  // 🔍 Знайти абонемент по email
  const subscriptions = await SubscriptionsCollection.find({
    email: user.email.toLowerCase(),
  });

  if (subscriptions.length > 0) {
    for (const sub of subscriptions) {
      const alreadyLinked = user.history?.some(
        (entry) => entry.subscriptionId?.toString() === sub._id.toString(),
      );

      if (!alreadyLinked) {
        user.history.push({
          subscriptionId: sub._id,
          clientId: sub.clientId,
          type: sub.type,
          startDate: sub.startDate,
          endDate: sub.endDate,
          price: sub.price,
          method: sub.method,
          status: sub.status,
        });

        // ❗️Опціонально: позначити як використаний
        // sub.status = 'claimed';
        // await sub.save();
      }
    }

    await user.save();
  }

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
    expires: new Date(Date.now() + ONE_DAY),
  });

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

export const checkSessionController = async (req, res) => {
  if (req.user) {
    return res.json({ success: true, user: req.user });
  }
  return res.status(401).json({ success: false, message: 'Сесія недійсна' });
};

export const refreshUserSessionController = async (req, res) => {
  const session = await refreshUsersSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
    expires: new Date(session.refreshTokenValidUntil),
  });
  res.cookie('sessionId', session._id.toString(), {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
    expires: new Date(session.refreshTokenValidUntil),
  });
};

// ADMIN

export const loginAdminController = async (req, res) => {
  const session = await loginAdmin(req.body);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
    expires: new Date(Date.now() + ONE_DAY),
  });

  res.json({
    status: 200,
    message: 'Successfully logged in an admin!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

// GOOGLE

export const getGoogleOAuthUrlController = async (req, res) => {
  const url = generateAuthUrl();
  res.json({
    status: 200,
    message: 'Successfully get Google OAuth url!',
    data: {
      url,
    },
  });
};

export const loginWithGoogleController = async (req, res) => {
  const session = await loginOrSignupWithGoogle(req.body.code);

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in via Google OAuth!',
    data: {
      accessToken: session.accessToken,
    },
  });
};
