// Imports:
import mongoose from 'mongoose';
import { globalConfig } from './config';

class DatabaseInitiator {
  private static instance: mongoose.Connection;

  private constructor() {} // private constructor to prevent instantiation.

  public static getInstance(): mongoose.Connection {
    if (!DatabaseInitiator.instance) {
      mongoose
        .connect(globalConfig.MONGO_URI)
        .then((res: typeof mongoose) => {
          console.log('Connected to database:', res.connection.host);
          DatabaseInitiator.instance = res.connection;
        })
        .catch((err: Error) =>
          console.log('Error connecting to database:', err.message)
        );
    }

    return DatabaseInitiator.instance;
  }
}

export default DatabaseInitiator;
