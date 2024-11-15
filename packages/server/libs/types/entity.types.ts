// Imports:
import { Document, Types } from 'mongoose';
import { AUTH_MODES } from '../enums/modes.enum';

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password?: string;
  oldPassword?: string;
  confirmPassword?: string;
  avatar: {
    public_id?: string;
    url: string;
  };
  age: number;
  dob: Date;
  country?: string;
  gender: 'male' | 'female';
  googleId?: string;
  role: 'user' | 'admin';
  check: AUTH_MODES.CREDENTIALS | AUTH_MODES.GOOGLE;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  createdAt?: Date;
  updatedAt?: Date;

  // Methods:
  GetJwtToken: () => string;
  ComparePassword: (_password: string) => Promise<boolean>;
  GetResetToken: () => string;
}

export interface IChat extends Document {
  _id: string;
  name: string;
  groupChat?: boolean;
  creator: {
    type: Types.ObjectId;
    ref: 'User';
  };
  members: [
    {
      type: Types.ObjectId;
      ref: 'User';
    },
  ];
}

export interface IMessage extends Document {
  _id: string;
  sender: {
    type: Types.ObjectId;
    ref: 'User';
  };
  chat: {
    type: Types.ObjectId;
    ref: 'Chat';
  };
  content: string;
  attachments: [
    {
      public_id: string;
      url: string;
    },
  ];
}

export interface IRequest extends Document {
  status: 'pending' | 'accepted' | 'rejected';
  sender: {
    type: Types.ObjectId;
    ref: 'User';
  };
  receiver: {
    type: Types.ObjectId;
    ref: 'Chat';
  };
}
