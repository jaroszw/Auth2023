import express from 'express';
import {
  signup,
  signin,
  signupwithgoogle,
  test,
} from '../controllers/auth.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/test', verifyToken, test);
router.post('/google', signupwithgoogle);

export default router;
