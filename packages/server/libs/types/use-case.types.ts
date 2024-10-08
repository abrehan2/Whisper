// Imports:
import { NextFunction, Request, Response } from 'express';
import { IUser } from './entity.types';
import UserRepository from '../../data-access/user.data';

export type IUserCase = {
  req: Request<object, object, Partial<IUser>>;
  res: Response;
  next: NextFunction;
  userRepo: UserRepository;
};
