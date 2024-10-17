// Imports:
import mongoose, { Schema } from 'mongoose';
import { Entities } from '../libs/types';

// Note: The document will be deleted after 5 minutes.
const schema = new Schema<Entities.IOtp>({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },

  otp: {
    type: String,
    required: [true, 'Please enter otp'],
  },

  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5,
  },
});

export default mongoose.model<Entities.IOtp>('Otp', schema);
