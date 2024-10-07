// Imports:
import { NextFunction, Request, Response } from 'express';
import UserRepository from '../data-access/user.data';
import User from '../entities/user.entity';
import { TryCatchBlock } from '../middlewares/error';
import { IUser } from '../libs/types/entity.types';
import CreateUser from '../use-cases/user/create-user';
import Logger from '../libs/utilities/logs';
import { globalError } from '../app/config';

// Instances:
const userRepo = new UserRepository(User);

// Controllers:
export const RegisterUser = TryCatchBlock(
  async (
    req: Request<object, object, IUser>,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      Logger('error', 'Empty body for user registration');
      return res.status(globalError.MissingField.statusCode).json({
        success: false,
        messagge: globalError.MissingField.message,
      });
    }

    const creationResponse = await CreateUser({
      req,
      res,
      next,
      userRepo,
    });

    if (!creationResponse) {
      Logger('error', 'User registration failed');
    }
  }
);
