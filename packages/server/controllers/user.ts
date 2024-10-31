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
  ResetPassword,
  UnlinkGoogle,
  UpdatePassword,
} from '../use-cases/user/user-use-case';
import Logger from '../libs/utilities/logs';
import { globalError } from '../app/config';
import { Entities } from '../libs/types';
import ErrorHandler from '../libs/utilities/error-handler';
import SendResponse from '../libs/utilities/send-response';

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
      return SendResponse(res, globalError.MissingField.statusCode, false, {
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
      return SendResponse(res, globalError.MissingField.statusCode, false, {
        message: globalError.MissingField.message,
      });
    }

    AuthorizeUser({ req, res, next, userRepo });
  }
);

export const LogoutUser = TryCatchBlock(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.query.id) {
      Logger('error', globalError.InvalidId.message);
      return SendResponse(res, globalError.InvalidId.statusCode, false, {
        message: globalError.InvalidId.message,
      });
    }

    if ((req.user as Entities.IUser).id !== req.query.id) {
      Logger('error', globalError.ProtectRoute.message);
      return next(
        new ErrorHandler(
          globalError.ProtectRoute.message,
          globalError.ProtectRoute.statusCode
        )
      );
    }

    Logout({ req, res });
  }
);

export const AuthUserProfile = TryCatchBlock(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.query.id) {
      Logger('error', globalError.InvalidId.message);
      return next(
        new ErrorHandler(
          globalError.InvalidId.message,
          globalError.InvalidId.statusCode
        )
      );
    }

    if ((req.user as Entities.IUser).id !== req.query.id) {
      Logger('error', globalError.ProtectRoute.message);
      return next(
        new ErrorHandler(
          globalError.ProtectRoute.message,
          globalError.ProtectRoute.statusCode
        )
      );
    }

    MeDetails({ req, res, next, userRepo });
  }
);

export const DetachGoogle = TryCatchBlock(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      Logger('error', globalError.ProtectRoute.message);
      return next(
        new ErrorHandler(
          globalError.ProtectRoute.message,
          globalError.ProtectRoute.statusCode
        )
      );
    }

    UnlinkGoogle({ req, res, next });
  }
);

export const ResetMethod = TryCatchBlock(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.query.token) {
      Logger('error', globalError.InvalidLink.message);
      return next(
        new ErrorHandler(
          globalError.InvalidLink.message,
          globalError.InvalidLink.statusCode
        )
      );
    }
    ResetPassword({ req, res, next, userRepo });
  }
);

export const UpdateUserPassword = TryCatchBlock(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      Logger('error', globalError.ProtectRoute.message);
      return next(
        new ErrorHandler(
          globalError.ProtectRoute.message,
          globalError.ProtectRoute.statusCode
        )
      );
    }

    if (!(req.user as Entities.IUser).password) {
      Logger('error', globalError.AuthMethod.message);
      return next(
        new ErrorHandler(
          globalError.AuthMethod.message,
          globalError.AuthMethod.statusCode
        )
      );
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      Logger('error', 'Empty body for user password update');
      return SendResponse(res, globalError.MissingField.statusCode, false, {
        message: globalError.MissingField.message,
      });
    }

    UpdatePassword({ req, res, next });
  }
);
