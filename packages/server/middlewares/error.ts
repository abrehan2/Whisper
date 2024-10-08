// Imports:
import ErrorHandler from '../libs/utilities/error-handler';
import mongoose from 'mongoose';
import { globalError } from '../app/config';
import { ExpressGenerics } from '../libs/types';
import { NextFunction, Request, Response } from 'express';
import Logger from '../libs/utilities/logs';

export const ErrorMiddleware = (
  err: ErrorHandler,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  err.message ||= globalError.default.message;
  err.statusCode ||= globalError.default.statusCode;

  if (err?.name === mongoose.Error.CastError.name) {
    err = new ErrorHandler(
      globalError.CastError.message,
      globalError.CastError.statusCode
    );
  }

  if (err?.code === 11000) {
    console.log('I AM HERE IN 11000');
    err = new ErrorHandler(
      globalError[11000].message,
      globalError[11000].statusCode
    );
  }

  if (err?.name === 'JsonWebTokenError') {
    err = new ErrorHandler(
      globalError.JsonWebTokenError.message,
      globalError.JsonWebTokenError.statusCode
    );
  }

  if (err?.name === 'TokenExpiredError') {
    err = new ErrorHandler(
      globalError.TokenExpiredError.message,
      globalError.TokenExpiredError.statusCode
    );
  }

  Logger('error', err.message);

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export const TryCatchBlock =
  (fn: ExpressGenerics.ControllerTypeArg) =>
    (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
