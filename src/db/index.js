import mongoose from 'mongoose';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

export const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    connectTimeoutMS: 4000,
  });
  console.log('MongoDB Connected');
};
