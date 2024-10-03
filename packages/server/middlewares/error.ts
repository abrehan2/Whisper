// Imports:
import { ExpressGenerics } from '../libs/types';
import ErrorHandler from '../libs/utilities/error-handler';
import mongoose from 'mongoose';
import { globalError } from '../app/config';

export default function ErrorMiddleware({
  err,
  res,
}: ExpressGenerics.ExpressGenericArg) {
  let message: string = globalError.default.message;
  let statusCode: number = globalError.default.statusCode;

  if (err) {
    err.message ||= message;
    err.statusCode ||= statusCode;
  }

  if (err?.name === mongoose.Error.CastError.name) {
    message = globalError.CastError.message;
    statusCode = globalError.CastError.statusCode;
    err = new ErrorHandler(message, statusCode);
  }

  if (err?.code === 11000) {
    message = globalError[11000].message;
    statusCode = globalError[11000].statusCode;
    err = new ErrorHandler(message, statusCode);
  }

  if (err?.name === 'JsonWebTokenError') {
    message = globalError.JsonWebTokenError.message;
    statusCode = globalError.JsonWebTokenError.statusCode;
    err = new ErrorHandler(message, statusCode);
  }

  if (err?.name === 'TokenExpiredError') {
    message = globalError.TokenExpiredError.message;
    statusCode = globalError.TokenExpiredError.statusCode;
    err = new ErrorHandler(message, statusCode);
  }

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
}
