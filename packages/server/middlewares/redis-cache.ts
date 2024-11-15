// Imports:
import { NextFunction, Request, Response } from 'express';
import redis from '../app/redis';

export default function GetCachedData(key: string) {
  return async (_req: Request, res: Response, next: NextFunction) => {
    const data = await redis.get(key);

    if (data) {
      return res.status(200).json({
        success: true,
        data: JSON.parse(data),
      });
    }
    next();
  };
}
