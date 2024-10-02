// Imports:
import mongoose from 'mongoose';
import GlobalConfig from './config';

function initiateDB() {
  mongoose
    .connect(GlobalConfig.MONGO_URI)
    .then((res: typeof mongoose) =>
      console.log('Connected to database:', res.connection.host)
    )
    .catch((err: Error) =>
      console.log('Error connecting to database:', err.message)
    );
}

export default initiateDB;
