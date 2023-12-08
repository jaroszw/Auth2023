import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(errorHandler(401, 'You are not authenticated'));
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;

    if (user.id !== req.params.id) {
      return next(errorHandler(401, 'You can update only your account'));
    }

    next();
  } catch (error) {
    next(errorHandler('unauthorized', 400));
  }
};
