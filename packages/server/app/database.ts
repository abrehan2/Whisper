// Imports:
import mongoose from 'mongoose';
import { globalConfig } from './config';

function InitiateDB() {
  mongoose
    .connect(globalConfig.MONGO_URI)
    .then((res: typeof mongoose) =>
      console.log('Connected to database:', res.connection.host)
    )
    .catch((err: Error) =>
      console.log('Error connecting to database:', err.message)
    );
}

export default InitiateDB;
