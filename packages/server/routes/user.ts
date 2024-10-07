// Imports:
import express from 'express';
import { RegisterUser } from '../controllers/user';


// Variables:
const router = express.Router();

// Route: /api/v1
router.route('/auth').post(RegisterUser);


export default router;
