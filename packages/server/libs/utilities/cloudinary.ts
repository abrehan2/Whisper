// Imports:
import cloudinary from 'cloudinary';
import { globalConfig } from '../../app/config';

class Cloudinary {
  private static instance: typeof cloudinary.v2;

  // private constructor to prevent instantiation.
  private constructor() {}

  public static getInstance(): typeof cloudinary.v2 {
    if (!Cloudinary.instance) {
      cloudinary.v2.config({
        cloud_name: globalConfig.CLOUDINARY_NAME,
        api_key: globalConfig.CLOUDINARY_API,
        api_secret: globalConfig.CLOUDINARY_SECRET,
      });
    }

    Cloudinary.instance = cloudinary.v2;

    return Cloudinary.instance;
  }
}

export const cloudinaryInstance = Cloudinary.getInstance();
