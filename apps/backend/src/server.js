// src/server.js

import express from 'express';
import dotenv from 'dotenv';
import pino from 'pino-http';
import cors from 'cors';

import cookieParser from 'cookie-parser';

import router from './routers/index.js';

import { getEnvVar } from './utils/getEnvVar.js';

import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

dotenv.config();
const PORT = Number(getEnvVar('PORT', '8600'));

export const startServer = () => {
  const app = express();

  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
      limit: '100kb',
    }),
  );

  app.use(
    cors({
      origin: [
        'http://localhost:5173',
        'http://localhost:5174',
        'https://plusfit-club-nmf7.vercel.app',
      ],

      credentials: true,
    }),
  );

  app.use(cookieParser());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello World!',
    });
  });

  app.use(router);

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
