// Imports:
import express from 'express';
import {
  AuthUserProfile,
  DetachGoogle,
  LoginUser,
  LogoutUser,
  RegisterUser,
  ResetMethod,
  UpdateUserPassword,
} from '../controllers/user';
import passport from 'passport';
import { ProtectRoute } from '../middlewares/auth';

// Variables:
const router = express.Router();

// Route: /api/v1/user
router.route('/auth').post(RegisterUser);
router.route('/auth/google').get(
  passport.authenticate('google', {
    scope: ['email', 'profile'],
  })
);
router.route('/auth/google/callback').get(
  passport.authenticate('google', {
    session: false,
  })
);
router.route('/authorize').post(LoginUser);
router.route('/reset').patch(ResetMethod);

// Protected route(s):
router.route('/logout').get(ProtectRoute, LogoutUser);
router.route('/me').get(ProtectRoute, AuthUserProfile);
router.route('/unlink').get(ProtectRoute, DetachGoogle);
router.route('/update/password').patch(ProtectRoute, UpdateUserPassword);

export default router;
