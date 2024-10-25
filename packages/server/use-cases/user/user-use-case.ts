// Imports:
import {
  globalConfig,
  globalEmails,
  globalError,
  globalKeys,
} from '../../app/config';
import { AUTH_MODES } from '../../libs/enums/modes.enum';
import { Entities, UseCase } from '../../libs/types';
import ErrorHandler from '../../libs/utilities/error-handler';
import validator from 'validator';
import Logger from '../../libs/utilities/logs';
import SetToken from '../../libs/utilities/set-token';
import redis from '../../app/redis';
import SendResponse from '../../libs/utilities/send-response';
import SendMail from '../../libs/utilities/mail-it';

export async function CreateUser({
  req,
  res,
  next,
  userRepo,
}: UseCase.IUserCase) {
  const { name, email, country, password } = req.body;
  const { check } = req.query;

  if (AUTH_MODES['CREDENTIALS'] === check) {
    if (!name || !email || !country || !password) {
      Logger('error', globalError.MissingField.message);
      return next(
        new ErrorHandler(
          globalError.MissingField.message,
          globalError.MissingField.statusCode
        )
      );
    }

    const isExist = await userRepo.findOne(email);

    if (isExist) {
      Logger('error', globalError.EntityExist.message);
      return next(
        new ErrorHandler(
          globalError.EntityExist.message,
          globalError.EntityExist.statusCode
        )
      );
    }

    const isStrongPassword = validator.isStrongPassword(password);

    if (!isStrongPassword) {
      Logger('error', globalError.StrongPassword.message);
      return next(
        new ErrorHandler(
          globalError.StrongPassword.message,
          globalError.StrongPassword.statusCode
        )
      );
    }

    const creationResponse = await userRepo.create(
      {
        name,
        email,
        country,
        password,
        avatar: {
          public_id: globalConfig.WHISPER_DEFAULT_PUBLIC_ID,
          url: globalConfig.WHISPER_DEFAULT_URL,
        },
      },
      AUTH_MODES.CREDENTIALS
    );

    if (!creationResponse) {
      Logger('error', 'User registration failed');
      return res.status(400).json({
        success: false,
        message: 'User registration failed',
      });
    }

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
    });
  }
}
export async function AuthorizeUser({
  req,
  res,
  next,
  userRepo,
}: UseCase.IUserCase) {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new ErrorHandler(
        globalError.MissingField.message,
        globalError.MissingField.statusCode
      )
    );
  }

  const user = await userRepo.findOne(email);

  if (!user || !user.password) {
    return next(
      new ErrorHandler(
        globalError.InvalidCredentials.message,
        globalError.InvalidCredentials.statusCode
      )
    );
  }

  const isPasswordMatched = await user.ComparePassword(password);

  if (!isPasswordMatched) {
    return next(
      new ErrorHandler(
        globalError.InvalidCredentials.message,
        globalError.InvalidCredentials.statusCode
      )
    );
  }

  await redis.set(
    globalKeys.REDIS.USER.concat(`-${user.id}`),
    JSON.stringify(user)
  );

  SetToken(user, 200, res, next);
}

export async function Logout({
  req,
  res,
}: Pick<UseCase.IUserCase, 'req' | 'res'>) {
  const { id } = req.query;

  await redis.del(globalKeys.REDIS.USER.concat(`-${id}`));

  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  SendResponse(res, 200, true, {
    message: 'You have successfully logged out. Thank you for visiting!',
  });
}

export async function MeDetails({
  req,
  res,
  next,
  userRepo,
}: UseCase.IUserCase) {
  const { id } = req.query;

  const redisUser = await redis.get(globalKeys.REDIS.USER.concat(`-${id}`));
  let user = JSON.parse(String(redisUser)) ?? undefined;

  if (user) {
    return SendResponse(res, 200, true, user);
  }

  user = userRepo.findById(String(id));
  await Promise.all([
    user,
    redis.set(globalKeys.REDIS.USER.concat(`-${id}`), user),
  ]);

  if (!user) {
    return next(
      new ErrorHandler(
        globalError.UserExist.message,
        globalError.UserExist.statusCode
      )
    );
  }

  SendResponse(res, 200, true, user);
}

export async function UnlinkGoogle({
  req,
  res,
  next,
}: Pick<UseCase.IUserCase, 'req' | 'res' | 'next'>) {
  const user = req?.user as Entities.IUser;
  const resetToken = user.GetResetToken();

  await user.save({ validateBeforeSave: true });
  const resetPasswordUrl = globalConfig.FRONT_END_BASE.concat(
    `/password/reset/${resetToken}`
  );
  const message = globalEmails.UnlinkGoogle.message.concat(
    `\n\n${resetPasswordUrl}`
  );

  try {
    await SendMail({
      email: user.email,
      subject: 'Action Required: Set Your New Password',
      message,
    });

    res.clearCookie('token'); // Remove token after unlinking google 

    return SendResponse(res, 200, true, {
      message: `The email was successfully sent to ${user.email}`,
    });
  } catch (err: unknown) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(String(err), 500));
  }
}
