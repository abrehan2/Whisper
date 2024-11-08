// Imports:
import { config } from 'dotenv';

// Instances:
config({ path: 'app/local.env' });

// Exports:
const globalConfig = {
  BACK_END_PORT: process.env.PORT || '',
  FRONT_END_BASE: process.env.FRONT_END_BASE || '',
  MONGO_URI: process.env.MONGO_URI || '',
  JWT_SECRET: process.env.JWT_SECRET || '',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '',
  RESET_TOKEN_TIME: process.env.RESET_TOKEN_TIME || null,
  COOKIE_EXPIRE_TIME: process.env.COOKIE_EXPIRE_TIME || null,
  WHISPER_DEFAULT_PUBLIC_ID: process.env.WHISPER_DEFAULT_PUBLIC_ID || '',
  WHISPER_DEFAULT_URL: process.env.WHISPER_DEFAULT_URL || '',
  SMPT_SERVICE: process.env.SMPT_SERVICE || '',
  SMPT_MAIL: process.env.SMPT_MAIL || '',
  SMPT_PASSWORD: process.env.SMPT_PASSWORD || '',
  SMPT_HOST: process.env.SMPT_HOST || '',
  SMPT_PORT: process.env.SMPT_PORT || '',
  CLIENT_ID: process.env.CLIENT_ID || '',
  CLIENT_SECRET: process.env.CLIENT_SECRET || '',
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL || '',
};

const globalError = {
  default: {
    message: 'Internal server error',
    statusCode: 500,
  },

  CastError: {
    message: 'Invalid MongoDB Id',
    statusCode: 400,
  },

  11000: {
    message: 'Duplicate key found',
    statusCode: 400,
  },

  JsonWebTokenError: {
    message: 'Json web token is invalid',
    statusCode: 400,
  },

  TokenExpiredError: {
    message: 'Json web token has expired',
    statusCode: 400,
  },

  MissingField: {
    message: 'Please fill all the fields',
    statusCode: 400,
  },

  StrongPassword: {
    message:
      'Password must include at least one uppercase letter and one special character',
    statusCode: 400,
  },

  InvalidCredentials: {
    message: 'Invalid email or password',
    statusCode: 401,
  },

  EntityExist: {
    message: 'The email address you entered is already registered',
    statusCode: 409,
  }


};

export { globalConfig, globalError };
