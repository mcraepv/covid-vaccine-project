require('dotenv').config();
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import cors from 'cors';
import { createServer } from 'http';
import cookieParser from 'cookie-parser';
import cron from 'node-cron';

import sequelize from './db/sequelize';
import { createSlots } from './utils/createSlots';
import resolvers from './graphql/resolvers';
import { expireGuarantees } from './utils/expireGuarantees';

const startServer = async () => {
  const schema = await buildSchema({
    resolvers,
  });

  const server = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({ req, res }),
  });

  await sequelize();

  const app = express();
  app.use(cookieParser());
  app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
    })
  );

  app.get('/', function (req, res) {
    res.send('');
  });

  server.applyMiddleware({ app, path: '/graphql' });

  const httpServer = createServer(app);

  cron.schedule('* * * * *', expireGuarantees);
  const startDate = new Date();
  createSlots(5, startDate.setHours(8), 5);

  httpServer.listen({ port: process.env.PORT }, (): void =>
    console.log(`Server is running on port ${process.env.PORT}/graphql`)
  );
};

startServer().then();
