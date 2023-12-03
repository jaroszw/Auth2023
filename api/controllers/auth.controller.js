import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

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

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'User not found'));
    const validPassrd = bcrypt.compareSync(password, validUser.password);
    if (!validPassrd) return next(errorHandler(401, 'wrong credentials'));

    const expiryDate = new Date(Date.now() + 3600000);

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const { password: hashedPassword, ...rest } = validUser._doc;
    res
      .cookie('access_token', token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json({ ...rest, success: true });
  } catch (error) {
    next(error);
  }
};
