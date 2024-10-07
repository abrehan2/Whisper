// Imports:
import { NextFunction, Request, Response } from 'express';
import { IUser } from './entity.types';
import UserRepository from '../../data-access/user.data';

export type ICreateUser = {
  req: Request<object, object, IUser>;
  res: Response;
  next: NextFunction;
  userRepo: UserRepository;
};
