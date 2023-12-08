import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import 'dotenv/config';

const app = express();

app.use(cookieParser());

// app.use((req, res, next) => {
//   // res.setHeader('Access-Control-Allow-Origin', ['http://localhost:5173']);
//   // res.setHeader('Access-Control-Allow-Credentials', ['true']);
//   next();
// });

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to DB');
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

app.use(
  cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'PUT', 'POST'],
    credentials: true,
  })
);

app.listen(3000, () => {
  console.log('Server is listenning on port 3000');
});

app.get('/', (req, res) => {
  res.send({ message: 'Hello on the main page' });
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
