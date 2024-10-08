// Imports:
import { Request, Response, NextFunction } from 'express';

type ControllerTypeArg = (
  _req: Request,
  _res: Response,
  _next: NextFunction
) => Promise<void | Response<unknown, Record<string, unknown>>>;

export { ControllerTypeArg };
