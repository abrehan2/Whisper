// Imports:
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import passport from 'passport';
import { Request } from 'express';
import { globalConfig, globalKeys } from '../../app/config';
import { userRepo } from '../../controllers/user';
import { AUTH_MODES } from '../enums/modes.enum';
import SetToken from './set-token';
import { Entities, Passport } from '../types';
import redis from '../../app/redis';

passport.use(
  new Strategy(
    {
      clientID: globalConfig.CLIENT_ID,
      clientSecret: globalConfig.CLIENT_SECRET,
      callbackURL: globalConfig.GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
      scope: ['email', 'profile'],
    },

    async function (
      request: Request,
      _accessToken: string,
      _refreshToken: string,
      profile: Passport.IProfile,
      done: VerifyCallback
    ) {
      try {
        const user = await userRepo.findOne({ email: profile.email });

        if (!user) {
          const createdUser = await userRepo.create(
            {
              name: profile.displayName,
              email: profile.email,
              avatar: {
                url: profile.photos && profile?.photos[0].value,
              },
              googleId: profile.id,
            },
            AUTH_MODES.GOOGLE
          );

          await redis.set(
            globalKeys.REDIS.USER.concat(
              `-${(createdUser as Entities.IUser).id}`
            ),
            JSON.stringify(createdUser)
          );

          return SetToken(
            createdUser as Entities.IUser,
            201,
            request.res!,
            request.next!
          );
        }

        if (!user?.googleId) {
          await user?.updateOne({
            googleId: profile.id,
          });
        }

        await redis.set(
          globalKeys.REDIS.USER.concat(`-${user.id}`),
          JSON.stringify(user)
        );

        return SetToken(
          user as Entities.IUser,
          200,
          request.res!,
          request.next!
        );
      } catch (error: unknown) {
        console.log('ERROR IN GOOGLE STRATEGY: ', error);
        return done(error, null);
      }
    }
  )
);
