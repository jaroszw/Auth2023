import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
// import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.json({ success: true, message: 'User signed sucesfully' });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
