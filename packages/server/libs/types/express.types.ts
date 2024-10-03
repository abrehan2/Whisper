// Imports:
import { Request, Response, NextFunction } from 'express';
import ErrorHandler from '../utilities/error-handler';

type ExpressGenericArg = {
  req: Request;
  res: Response;
  next: NextFunction;
  err: ErrorHandler;
};

export { ExpressGenericArg };
