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
};

enum tokenConfig {
  RESET_TOKEN_TIME = 15,
}

export { globalConfig, tokenConfig };
