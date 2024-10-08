// Imports:
import express, { ErrorRequestHandler, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { globalConfig } from './config';
import InitiateDB from './database';
import { ErrorMiddleware } from '../middlewares/error';
import userRouter from '../routes/user';
import bodyParser from 'body-parser';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServer, BaseContext } from '@apollo/server';
import InitiateGraphQl from './apollo-server';

// Variables:
const app = express();
const graphServer = InitiateGraphQl();
const apiPrefix: string = '/api/v1';

// Invokations:
InitiateDB();
(async () => {
  await graphServer.start();
  app.use(
    '/graph',
    expressMiddleware(graphServer as unknown as ApolloServer<BaseContext>)
  );
})();

// Middlwares:

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(
  cors({
    origin: globalConfig.FRONT_END_BASE,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

// Test route:
app.get('/', (_req: Request, res: Response) => {
  res.send('Hello, this is whisper from sever.');
});

// Routes:
app.use(apiPrefix.concat('/user'), userRouter);

app.use(ErrorMiddleware as unknown as ErrorRequestHandler);

export default app;
