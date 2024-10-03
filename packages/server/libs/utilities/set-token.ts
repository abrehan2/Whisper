// IMPORTS -
import { NextFunction, Response } from 'express';
import { IUser } from '../types/entity.types';
import ErrorHandler from './error-handler';
import { globalConfig } from '../../app/config';

export default function SetToken(
  user: IUser,
  statusCode: number,
  res: Response,
  next: NextFunction
) {
  const token = user.GetJwtToken();

  if (!token) {
    return next(new ErrorHandler('Unable to proceed your request', 500));
  }

  const options = {
    expires: new Date(
      Date.now() + (Number(globalConfig.COOKIE_EXPIRE_TIME) * 24 * 60 * 60 * 1000)
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
    user,
  });
}
