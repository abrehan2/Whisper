// Imports:
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import GlobalConfig from './config';
import { ExpressGenerics } from '../libs/types';

// Variables:
const app = express();

// Middlwares:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(
  cors({
    origin: GlobalConfig.FRONT_END_BASE,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

// Test route:
app.get('/', ({ res }: ExpressGenerics.ExpressGenericArg) => {
  res.send('Hello, this is whisper from sever.');
});

export default app;
