import { errorHandler } from '../utils/error.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

export const user = (req, res) => {
  res.json({
    message: 'User is working',
  });
};

export const updateUser = async (req, res, next) => {
  const userid = req.user.id;

  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );
    const { pasword, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
