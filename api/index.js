import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import 'dotenv/config';

console.log('FRESH');

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to DB');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log('Server is listenning on port 3000');
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
