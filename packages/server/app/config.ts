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
  RESET_TOKEN_TIME: process.env.RESET_TOKEN_TIME,
  COOKIE_EXPIRE_TIME: process.env.COOKIE_EXPIRE_TIME,
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
};

export { globalConfig, globalError };
