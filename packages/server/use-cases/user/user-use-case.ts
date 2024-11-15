// Imports:
import { globalConfig, globalError } from '../../app/config';
import { AUTH_MODES } from '../../libs/enums/modes.enum';
import { UseCase } from '../../libs/types';
import ErrorHandler from '../../libs/utilities/error-handler';
import validator from 'validator';
import Logger from '../../libs/utilities/logs';
import SetToken from '../../libs/utilities/set-token';

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

  if (AUTH_MODES['GOOGLE'] === check) {
    // TODO: Google auth comes here.
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

  if (!user) {
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

  SetToken(user, 200, res, next);
}
