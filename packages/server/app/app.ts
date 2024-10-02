// Imports:
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { globalConfig } from './config';
import { ExpressGenerics } from '../libs/types';
import InitiateDB from './database';

// Variables:
const app = express();

// Invokations:
InitiateDB();

// Middlwares:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(
  cors({
    origin: globalConfig.FRONT_END_BASE,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

// Test route:
app.get('/', (res: ExpressGenerics.ExpressGenericArg['res']) => {
  res.send('Hello, this is whisper from sever.');
});

export default app;
