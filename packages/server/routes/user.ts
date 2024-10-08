// Imports:
import express from 'express';
import { LoginUser, RegisterUser } from '../controllers/user';

// Variables:
const router = express.Router();

// Route: /api/v1
router.route('/auth').post(RegisterUser);
router.route('/authorize').post(LoginUser);

export default router;
