import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/users.js';
import videoRoutes from './routes/videos.js';
import commentRoutes from './routes/comments.js';
import authRoutes from './routes/auth.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('Connect to MONGO DB successfully');
  } catch (e) {
    console.log('Connect to MONGO DB failed!');
    throw e;
  }
};

const { PORT } = process.env || {};

app.use(cookieParser());
app.use(express.json());
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/videos', videoRoutes);
app.use('/api/v1/comments', commentRoutes);
app.use('/api/v1/auth', authRoutes);

app.use((err, _req, res, _next) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong!';
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(PORT, async () => {
  connect();
  console.log('Server is running on PORT:', PORT);
});
