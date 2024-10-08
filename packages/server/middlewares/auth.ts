// Imports:
import User from '../entities/user.entity';
import ErrorHandler from '../libs/utilities/error-handler';
import { TryCatchBlock } from './error';

export const AdminOnly = TryCatchBlock(async (req, _res, next) => {
  const { id } = req.query;

  if (!id) return next(new ErrorHandler('Id not found', 404));
  const user = await User.findById(id);

  if (!user) return next(new ErrorHandler('User not found', 404));

  if (user.role !== "admin") return next(new ErrorHandler('Not authorized to access this resource', 401));

  next();
});
