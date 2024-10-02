// Imports:
import app from './app';
import GlobalConfig from './config';

// Handling uncaught exception:
process.on('uncaughtException', (err: Error) => {
  console.log('Error: ', err.message);
  console.log('Shutting down server due to uncaught exception.');
  process.exit(1);
});

// Server:
const server = app.listen(Number(GlobalConfig.BACK_END_PORT), () => {
  console.log('Server is running on port:', GlobalConfig.BACK_END_PORT);
});

// Unhandled promise rejection:
process.on('unhandledRejection', (err: Error) => {
  console.log('Error: ', err.message);
  console.log('Shutting down server due to unhandled promise rejection.');
  server.close(() => process.exit(1));
});
