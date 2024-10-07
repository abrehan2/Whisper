// Imports:
import { globalConfig, globalError } from '../../app/config';
import { AUTH_MODES } from '../../libs/enums/modes.enum';
import { UseCase } from '../../libs/types';
import ErrorHandler from '../../libs/utilities/error-handler';
import validator from 'validator';

export default async function CreateUser({
  req,
  res,
  next,
  userRepo,
}: UseCase.ICreateUser) {
  const { name, email, country, password } = req.body;
  const { check } = req.query;
  console.log(check);
  console.log('I AM HERE');

  if (AUTH_MODES['CREDENTIALS'] === check) {
    console.log('INSIDE PARENT---');
    if (!name || !email || !country || !password) {
      return next(
        new ErrorHandler(
          globalError.MissingField.message,
          globalError.MissingField.statusCode
        )
      );
    }

    const isStrongPassword = validator.isStrongPassword(password);

    if (!isStrongPassword) {
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
      return creationResponse;
    }

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
    });
  }

  // res.status(200).json({
  //   message: 'chal raha hoon',
  // });
}
