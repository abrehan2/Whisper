// Imports:
import { config } from 'dotenv';

// Instances:
config({ path: 'app/local.env' });

// Exports:
const GlobalConfig = {
  BACK_END_PORT: process.env.PORT || '',
  FRONT_END_BASE: process.env.FRONT_END_BASE || '',
};

export default GlobalConfig;
