// Imports:
import Logger from '../libs/utilities/logs';
import app from './app';
import { globalConfig } from './config';

// Handling uncaught exception:
process.on('uncaughtException', (err: Error) => {
  Logger('error', err.message);
  console.log('Shutting down server due to uncaught exception.');
  process.exit(1);
});

// Server:
const server = app.listen(Number(globalConfig.BACK_END_PORT), () => {
  console.log('Server is running on port:', globalConfig.BACK_END_PORT);
});

// Unhandled promise rejection:
process.on('unhandledRejection', (err: Error) => {
  Logger('error', err.message);
  console.log('Shutting down server due to unhandled promise rejection.');
  server.close(() => process.exit(1));
});
