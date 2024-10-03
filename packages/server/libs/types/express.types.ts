// Imports:
import { Request, Response, NextFunction } from 'express';
import ErrorHandler from '../utilities/error-handler';

type ExpressGenericArg = {
  req: Request;
  res: Response;
  next: NextFunction;
  err: ErrorHandler;
};

type ControllerTypeArg = (
  _req: Request,
  _res: Response,
  _next: NextFunction
) => Promise<void | Response<unknown, Record<string, unknown>>>;

// TODO: Replace unknow with any if problems occur.

export { ExpressGenericArg, ControllerTypeArg };
