// Imports:
import { Request, Response, NextFunction } from 'express';

type ExpressGenericArg = {
  req: Request;
  res: Response;
  next?: NextFunction;
};

export { ExpressGenericArg };
