// Imports:
import mongoose, { Schema } from 'mongoose';
import { IUser } from './types';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import JsonWebToken from 'jsonwebtoken';
import { globalConfig, tokenConfig } from '../app/config';

const schema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Please enter name'],
    },

    email: {
      type: String,
      unique: true,
      required: [true, 'Please enter email'],
      validate: validator.default.isEmail,
    },

    password: {
      type: String,
      select: false,
      minLength: [8, 'Password should be greater than 8 characters'],
    },

    avatar: {
      public_id: String,
      url: {
        type: String,
        required: true,
      },
    },

    dob: {
      type: Date,
      required: [true, 'Please enter date of birth'],
    },

    gender: {
      type: String,
      enum: ['male', 'female'],
      required: [true, 'Please specify gender'],
    },

    googleId: String,

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },

  {
    timestamps: true,
  }
);

// Virtual for user's age:
schema.virtual('age').get(function () {
  const today = new Date();
  const dob = this.dob;
  let age: number = today.getFullYear() - dob.getFullYear();

  if (
    today.getMonth() < dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
  ) {
    age--;
  }

  return age;
});

// Bcrypt password before saving user:
schema.pre(
  'save',
  async function (next: mongoose.CallbackWithoutResultAndOptionalError) {
    if (!this.isModified('password')) {
      next();
    }

    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
);

// Jwt Token Method:
schema.methods.GetJwtToken = function () {
  return JsonWebToken.sign({ id: this._id }, globalConfig.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare Password Method:
schema.methods.ComparePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Reset Password Token:
schema.methods.GetResetToken = function () {
  const resetToken: string = crypto.randomBytes(20).toString('hex');
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  const resetTime: number = tokenConfig['RESET_TOKEN_TIME'];
  this.resetPasswordExpire = Date.now() + (resetTime * 60 * 1000);
};

export default mongoose.model<IUser>('User', schema);
