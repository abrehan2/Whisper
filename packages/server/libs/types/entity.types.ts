// Imports:
import { Document } from 'mongoose';
import { AUTH_MODES } from '../enums/modes.enum';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  avatar: {
    public_id?: string;
    url: string;
  };
  age: number;
  dob: Date;
  country: string;
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
  ComparePassword: () => Promise<boolean>;
  GetResetToken: () => void;
}