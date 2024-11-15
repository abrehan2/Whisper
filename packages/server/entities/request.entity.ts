// Imports:
import mongoose, { Schema } from 'mongoose';
import { Entities } from '../libs/types';

const schema = new Schema<Entities.IRequest>(
  {
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat',
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

export default mongoose.model<Entities.IRequest>('Request', schema);
