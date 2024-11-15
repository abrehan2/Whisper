// Imports:
import mongoose, { Schema } from 'mongoose';
import { Entities } from '../libs/types';

const schema = new Schema<Entities.IChat>(
  {
    name: {
      type: String,
      required: true,
    },

    groupChat: {
      type: Boolean,
      default: false,
    },

    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },

  {
    timestamps: true,
  }
);

export default mongoose.model<Entities.IChat>('Chat', schema);
