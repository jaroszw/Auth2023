import express from 'express';
import {
  signup,
  signin,
  signupwithgoogle,
} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google', signupwithgoogle);

export default router;
