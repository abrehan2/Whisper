// Imports:
import { NextFunction, Request, Response } from 'express';
import UserRepository from '../data-access/user.data';
import User from '../entities/user.entity';
import { TryCatchBlock } from '../middlewares/error';
import {
  AuthorizeUser,
  CreateUser,
  Logout,
  MeDetails,
} from '../use-cases/user/user-use-case';
import Logger from '../libs/utilities/logs';
import { globalError } from '../app/config';
import { Entities } from '../libs/types';

// Instances:
export const userRepo = new UserRepository(User);

// Controllers:
export const RegisterUser = TryCatchBlock(
  async (
    req: Request<object, object, Entities.IUser>,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      Logger('error', 'Empty body for user registration');
      return res.status(globalError.MissingField.statusCode).json({
        success: false,
        message: globalError.MissingField.message,
      });
    }

    CreateUser({
      req,
      res,
      next,
      userRepo,
    });
  }
);

export const LoginUser = TryCatchBlock(
  async (
    req: Request<object, object, Pick<Entities.IUser, 'email' | 'password'>>,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      Logger('error', 'Empty body for user login');
      return res.status(globalError.MissingField.statusCode).json({
        success: false,
        message: globalError.MissingField.message,
      });
    }

    AuthorizeUser({ req, res, next, userRepo });
  }
);

export const LogoutUser = TryCatchBlock(
  async (_req: Request, res: Response) => {
    Logout({ res });
  }
);

export const AuthUserProfile = TryCatchBlock(
  async (req: Request, res: Response, next: NextFunction) => {
    MeDetails({ req, res, next, userRepo });
  }
);
