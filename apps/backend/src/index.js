import { initMongoDB } from './db/initMongoDB.js';
import { startServer } from './server.js';
// import { SubscriptionsCollection } from './db/models/subscriptions.js';
// await SubscriptionsCollection.syncIndexes();

const bootstrap = async () => {
  await initMongoDB();
  startServer();
};

bootstrap();
