// Imports:
import { Document } from 'mongoose';

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
  gender: 'male' | 'female';
  googleId?: string;
  role: 'user' | 'admin';
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  createdAt?: Date;
  updatedAt?: Date;

  // Methods:
  GetJwtToken: () => string;
  ComparePassword: () => Promise<boolean>;
  GetResetToken: () => void;
}
