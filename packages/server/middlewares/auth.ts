// Imports:
import { globalConfig, globalError } from '../app/config';
import { userRepo } from '../controllers/user';
import ErrorHandler from '../libs/utilities/error-handler';
import { TryCatchBlock } from './error';
import jsonWebToken from 'jsonwebtoken';

export const ProtectRoute = TryCatchBlock(async (req, _res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(
      new ErrorHandler(
        globalError.ProtectRoute.message,
        globalError.ProtectRoute.statusCode
      )
    );
  }

  const decode = jsonWebToken.verify(token, globalConfig.JWT_SECRET);

  if (typeof decode !== 'string' && decode.id) {
    req.user = await userRepo.findById(decode.id);
  } else {
    return next(
      new ErrorHandler(
        globalError.ProtectRoute.message,
        globalError.ProtectRoute.statusCode
      )
    );
  }

  next();
});

export const AdminOnly = TryCatchBlock(async (req, _res, next) => {
  const { id } = req.query;

  if (!id) return next(new ErrorHandler(globalError.InvalidId.message, globalError.InvalidId.statusCode));
  const user = await userRepo.findById(String(id));

  if (!user) return next(new ErrorHandler(globalError.UserExist.message, globalError.UserExist.statusCode));

  if (user.role !== 'admin') return next(
    new ErrorHandler(globalError.AdminRoute.message, globalError.AdminRoute.statusCode)
  );

  next();
});
