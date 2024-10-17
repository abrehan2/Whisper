// Imports:
import express from 'express';
import { LoginUser, LogoutUser, RegisterUser } from '../controllers/user';
import passport from 'passport';

// Variables:
const router = express.Router();

// Route: /api/v1
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
router.route('/logout').get(LogoutUser);

export default router;
