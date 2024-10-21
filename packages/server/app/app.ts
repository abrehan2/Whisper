// Imports:
import express, { ErrorRequestHandler, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { globalConfig } from './config';
import InitiateDB from './database';
import { ErrorMiddleware } from '../middlewares/error';
import userRouter from '../routes/user';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import '../libs/utilities/google-strategy';
import '../app/redis';

// Variables:
const app = express();
const apiPrefix: string = '/api/v1';

// Invokations:
InitiateDB();

// Middlwares:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(cookieParser());
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

app.get('/error', (_req: Request, res: Response) => {
  res.send('Hello, this is whisper and there is an error.');
});

// Routes:
app.use(apiPrefix.concat('/user'), userRouter);

app.use(ErrorMiddleware as unknown as ErrorRequestHandler);

export default app;
