/* eslint-disable indent */
// Imports:
import ErrorHandler from '../libs/utilities/error-handler';
import mongoose from 'mongoose';
import { globalError } from '../app/config';
import { ExpressGenerics } from '../libs/types';

export const ErrorMiddleware = ({
  err,
  res,
}: ExpressGenerics.ExpressGenericArg) => {
  err.message ||= globalError.default.message;
  err.statusCode ||= globalError.default.statusCode;

  if (err?.name === mongoose.Error.CastError.name) {
    err = new ErrorHandler(
      globalError.CastError.message,
      globalError.CastError.statusCode
    );
  }

  if (err?.code === 11000) {
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

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export const TryCatchBlock =
  (fn: ExpressGenerics.ControllerTypeArg) =>
  (
    req: ExpressGenerics.ExpressGenericArg['req'],
    res: ExpressGenerics.ExpressGenericArg['res'],
    next: ExpressGenerics.ExpressGenericArg['next']
  ) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
