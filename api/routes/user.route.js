import express from 'express';
import {
  user,
  updateUser,
  deleteUser,
} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/', user);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', deleteUser);

export default router;
